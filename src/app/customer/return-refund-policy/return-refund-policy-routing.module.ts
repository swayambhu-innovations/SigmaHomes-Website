import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnRefundPolicyComponent } from './return-refund-policy.component';

const routes: Routes = [{ path: '', component: ReturnRefundPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnRefundPolicyRoutingModule { }
