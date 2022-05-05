import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'lead-center',
        loadChildren: () =>
          import('./lead-center/lead-center.module').then(
            (m) => m.LeadCenterModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'properties',
        loadChildren: () =>
          import('./properties/properties.module').then(
            (m) => m.PropertiesModule
          ),
      },
      {
        path: 'task-log',
        loadChildren: () =>
          import('./task-log/task-log.module').then((m) => m.TaskLogModule),
      },
      {
        path: 'broadcast',
        loadChildren: () =>
          import('./broadcast/broadcast.module').then((m) => m.BroadcastModule),
      },
      {
        path: 'responses',
        loadChildren: () =>
          import('./responses/responses.module').then((m) => m.ResponsesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
