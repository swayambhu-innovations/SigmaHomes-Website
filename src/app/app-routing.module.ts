import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AgentGuard } from './guards/agent.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'agentPanel',
    loadChildren: () =>
      import('./agent/agent.module').then((m) => m.AgentModule),
    canActivate: [AgentGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found404/not-found404.module').then(
        (m) => m.NotFound404Module
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
