import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeadCreationComponent } from "./lead-creation/lead-creation.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { LeadCreationRouterModule } from "./lead-creation.router";
import { LeadDedupeComponent } from "./lead-dedupe/lead-dedupe.component";
import { LeadComponent } from "./lead.component";

@NgModule({
  declarations: [
    LeadCreationComponent,
    LeadDedupeComponent,
    LeadComponent,
  ],
  imports: [
    CommonModule,
    LeadCreationRouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class LeadCreationModule { }
