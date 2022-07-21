import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentGuard } from '../guards/agent.guard';
import { AgentComponent } from './agent.component';

const routes: Routes = [
  {
    path: '',
    component: AgentComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'lead-center',
        loadChildren: () =>
          import('./lead-center/lead-center.module').then(
            (m) => m.LeadCenterModule
          ),
        canActivate: [AgentGuard],
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'properties',
        loadChildren: () =>
          import('./properties/properties.module').then(
            (m) => m.PropertiesModule
          ),
        canActivate: [AgentGuard],
      },
      {
        path: 'task-log',
        loadChildren: () =>
          import('./task-log/task-log.module').then((m) => m.TaskLogModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'broadcast',
        loadChildren: () =>
          import('./broadcast/broadcast.module').then((m) => m.BroadcastModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'responses',
        loadChildren: () =>
          import('./responses/responses.module').then((m) => m.ResponsesModule),
        canActivate: [AgentGuard],
      },
      {
        path: 'personalityQuestions',
        loadChildren: () =>
          import('./personality-questions/personality-questions.module').then(
            (m) => m.PersonalityQuestionsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {}
