import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRefundPolicyRoutingModule } from './return-refund-policy-routing.module';
import { ReturnRefundPolicyComponent } from './return-refund-policy.component';


@NgModule({
  declarations: [
    ReturnRefundPolicyComponent
  ],
  imports: [
    CommonModule,
    ReturnRefundPolicyRoutingModule
  ]
})
export class ReturnRefundPolicyModule { }
