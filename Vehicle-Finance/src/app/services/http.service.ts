import { environment } from './../../environments/environment';
import { ErrorListenerService } from '@services/error-listener.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncryptService } from './encrypt.service';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { Router } from '@angular/router';
import { storage } from '../storage/localstorage';

export declare class myOptions {
  method: any;
  data?: any;
  params?: {
    [index: string]: string | number;
  };
  serializer?: 'json' | 'urlencoded' | 'utf8';
  timeout?: number;
  headers?: any;
  filePath?: string | string[];
  name?: string | string[];
  responseType?: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isMobile: any;
  ionicOption: myOptions;
  sharedKsy =
    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ+GJdSSEeaNFBLqyfM3DIOgQgWCwJ0INfeZZV7ITsLeuA7Yd02rrkYGIix1IWvoebWVmzhncUepYxHwK1ARCdUCAwEAAQ==';

  activeRequests: number = 0;

  constructor(
    private http: HttpClient,
    private httpIonic: HTTP,
    private ngxService: NgxUiLoaderService,
    private encrytionService: EncryptService,
    private errorListenerService: ErrorListenerService,
    private router: Router
  ) {
    this.isMobile = true
  }

  get(url?: string, params?: any) {
    if (this.isMobile) {
      return this.getM(url, params);
    } else {
      return this.http.get(url, params);
    }
  }

  post(url: string, body: any, showLoader: boolean = true, headers?: any) {
    if (showLoader) {
      this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    }
    let responseBody = JSON.parse(body);
    if(responseBody.ProcessVariables && typeof responseBody.ProcessVariables === 'object') {
        responseBody.ProcessVariables.outputUsers = localStorage.getItem('outputUsers')
    }

     body = JSON.stringify(responseBody)
    if (this.isMobile) {
      // if (url.includes('/account/v4/login')) {
      //   url = environment.host + '/account/v3/login';
      // }
      return this.postM(url, body);
    } else {
      if (headers) {
        return this.http.post(url, body, {
          headers: headers
        });
      }
      return this.http.post(url, body);
    }
  }

  postM(url?: string, params?: any) {
    let that = this;
    let reqEntity;

    console.log('parmas', params);

    reqEntity = params;

    if(this.activeRequests === 0){
      this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    }
    this.activeRequests++;

    const obs = new Observable(observer => {
      let data;

      this.httpIonic.setServerTrustMode('nocheck');

      console.log('post requestEntity********', reqEntity);

      let encryption = this.encrytionService.encrypt(
        reqEntity,
        environment.aesPublicKey
      );

      encryption.headers['authentication-token'] = storage.getToken()
        ? storage.getToken()
        : '';

      this.ionicOption = {
        method: 'post',
        data: encryption.rawPayload,
        headers: encryption.headers,
        serializer: 'utf8',
        responseType: 'text'
      };

      console.log('req post', this.ionicOption);

      console.log('post url********', url);

      this.httpIonic
        .sendRequest(url, this.ionicOption)
        .then(result => {
          console.log('result', result);

          if (
            result['headers']['content-type'] != 'text/plain' &&
            typeof (result['data'] != 'object')
          ) {
            data = JSON.parse(result['data']);
          } else {
            let decritedData = that.encrytionService.decryptMobileResponse(
              result
            );
            console.log('decritedData', decritedData);

            data = JSON.parse(decritedData);
            console.log('~~~***Response***~~~', data);
          }

          if (
            data['Error'] == '0' &&
            data['Error'] != undefined &&
            data['ProcessVariables'] != '' &&
            data['ProcessVariables'] != undefined &&
            data['ProcessVariables']['status'] == true &&
            data['ProcessVariables']['status'] != undefined &&
            data['ProcessVariables']['errorCode'] == '' &&
            data['ProcessVariables']['errorCode'] != undefined
          ) {
            // console.log("There are no Errors");
          } else if (
            data['Error'] == '0' &&
            data['Error'] != undefined &&
            data['ProcessVariables'] != '' &&
            data['ProcessVariables'] != undefined &&
            data['ProcessVariables']['status'] == false &&
            data['ProcessVariables']['status'] != undefined &&
            data['ProcessVariables']['errorCode'] != '' &&
            data['ProcessVariables']['errorCode'] != undefined
          ) {
            let cdsData = data['ProcessVariables']['errorCode'];
            let msg = data['ProcessVariables']['errorMessage'];
            if (
              data['ProcessVariables']['errorMessage'] != undefined &&
              data['ProcessVariables']['errroMessage'] != ''
            ) {
              // this.cds.setErrorData(true, cdsData, msg);  
              this.errorListenerService.setError({
                msg,
                errorCode: cdsData
              })
            } else {
              // this.cds.setErrorData(true, data);
              this.errorListenerService.setError({
                errorCode: cdsData
              })
            }
          } else if (
            data['Error'] == '0' &&
            data['Error'] != undefined &&
            data['ProcessVariables'] != '' &&
            data['ProcessVariables'] != undefined &&
            data['ProcessVariables']['status'] == false &&
            data['ProcessVariables']['status'] != undefined
          ) {
            if (data['ProcessName'] != 'Required documents' && data['ProcessName'] != 'Authenticate User Login') {
              let data = 'DEF';
              // this.cds.setErrorData(true, data);
              this.errorListenerService.setError({
                errorCode: data
              })
            }
          } else if (
            (data['Error'] == '1' && data['Error'] != undefined) ||
            (data['status'] === false && data['status'] != undefined)
          ) {
            let data = 'APP001';
            // this.cds.setErrorData(true, data);
            this.errorListenerService.setError({
              errorCode: data
            })
          }

          observer.next(data);
          observer.complete();

          if (data && data['login_required']) {
            // storage.removeToken();
            // storage.removeToken();
            // storage.removeToken();
            // this.utilService.clearCredentials();
            this.errorListenerService.setError({
              errorCode: 'SESSION_EXPIRED'
            })
            storage.removeToken();
            // storage.removeRoles();
            storage.removeUserId();
            // storage.removeBootData();
            // storage.removeBranchData();
            this.router.navigate(['/login']);

          }

          this.activeRequests--;
          if (this.activeRequests === 0) {
          this.ngxService.stop();
          }
        })
        .catch(error => {
          console.log('~~~***Response error***~~~', error);

          if (error['headers']['content-type'] == 'text/plain') {
            console.log('text/plain');
            let decritedData = that.encrytionService.decryptMobileResponse(
              error
            );
            console.log('decritedData', decritedData);

            data = JSON.parse(decritedData);
          }

          if (
            error['headers']['content-type'] != 'text/plain' &&
            typeof (error['data'] != 'object')
          ) {
            data = JSON.parse(error['data']);
          }

          observer.error(data);
          observer.complete();
          this.activeRequests--;
          if (this.activeRequests === 0) {
          this.ngxService.stop();
          }
        });
    });

    return obs;
  }

  getM(url?: string, params?: any) {
    this.ngxService.start();

    const obs = new Observable(observer => {
      const headers = {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'authentication-token': storage.getToken() ? storage.getToken() : ''
      };

      this.httpIonic.setServerTrustMode('nocheck');

      console.log('isMobile-url', url);

      this.httpIonic
        .get(url, {}, headers)
        .then(result => {
          console.log('isMobile-result', result);

          const data = JSON.parse(result.data);
          console.log('Data-success', data);
          observer.next(data);
          observer.complete();
          this.ngxService.stop();
        })
        .catch(error => {
          console.log('Data-error', error);
          observer.error(error);
          observer.complete();
          this.ngxService.stop();
        });
    });

    return obs;
  }

  downloadMFile(uri, savePath){
    this.ngxService.start();

    const obs = new Observable(observer => {

      let header = { 'authentication-token': localStorage.getItem('token') ? localStorage.getItem('token'): '' };
      this.httpIonic.setServerTrustMode('nocheck');

      this.httpIonic.downloadFile(uri, {}, header, savePath).then(result=>{
        console.log("Download file", result);
        observer.next(result);
        observer.complete();
        this.ngxService.stop();
      }).catch((error) => {
        console.log(" error Download file", error);
        observer.error(error);
        observer.complete();
        this.ngxService.stop();
      });

    });

    return obs;
  }
}
