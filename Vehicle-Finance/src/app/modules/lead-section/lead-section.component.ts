import { Component, OnInit } from '@angular/core';
// import { VehicleDetailService } from "./services/vehicle-detail.service";
// import { Location } from "@angular/common";
import { LabelsService } from 'src/app/services/labels.service';
// import { LeadStoreService } from '@services/lead-store.service';
// import { Component, OnInit } from '@angular/core';
import { VehicleDetailService } from './services/vehicle-detail.service';
import { LeadStoreService } from '@services/lead-store.service';
import {Router, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lead-section',
  templateUrl: './lead-section.component.html',
  styleUrls: ['./lead-section.component.css']
})
export class LeadSectionComponent implements OnInit {
  applicantName: string;
  applicantMobile: string;
  currentPage = 0;
  public labels: any;
  public hideElement: boolean= false;
  

  constructor(
    public router : Router,
    private leadSectionService: VehicleDetailService,
    private location: Location,
    private labelsData: LabelsService,
    private leadStoreService: LeadStoreService,
  ) {
    this.onHideRoute();
  }


  ngOnInit() {
    this.labelsData.getLabelsData().subscribe(
      data => {
        this.labels = data;
      }
      
    );
    
    const leadValue = this.leadStoreService.getLeadCreation();
    if (leadValue) {
      this.applicantName = `${leadValue.firstName} ${leadValue.lastName}`;
      this.applicantMobile = leadValue.mobile;
    }
    this.location.onUrlChange((url, state) => {
      if (url.includes('product-details')) {
        this.currentPage = 1;
      } else if (url.includes('vehicle-details')) {
        this.currentPage = 2;
      } else if (url.includes('applicant-details')) {
        this.currentPage = 1;
      } else if (url.includes('loan-details')) {
        this.currentPage = 4;
      } else if (url.includes('add-vehicle')) {
        this.currentPage = 2;
      }else if (url.includes('co-applicant')) {
        this.currentPage = 1;
      } else {
        this.currentPage = 0;
      }
    });
    

  }

  onHideRoute() {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        if(event.url ==='/pages/lead-section/co-applicant' || event.url ==='/pages/lead-section/credit-score' || event.url ==='/pages/lead-section/exact-match' || event.url ==='/pages/lead-section/otp-section' ){
          console.log('welcome to hide element')
          this.hideElement= true;
          console.log(this.hideElement)
        } else {
          this.hideElement = false;
        }
      }
    }
    )
  }
}
