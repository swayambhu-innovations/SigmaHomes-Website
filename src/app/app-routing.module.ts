import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    // redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./customer/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer/signup/signup.module').then((m) => m.SignupModule),
  },
  { path: 'terms-and-conditions', loadChildren: () => import('./customer/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule) },
  { path: 'returns-and-refunds', loadChildren: () => import('./customer/return-refund-policy/return-refund-policy.module').then(m => m.ReturnRefundPolicyModule) },
  { path: 'privacy', loadChildren: () => import('./customer/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: '**', loadChildren: () => import('./customer/not-found404/not-found404.module').then(m => m.NotFound404Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
