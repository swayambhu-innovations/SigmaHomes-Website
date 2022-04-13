import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AgentPageComponent } from './agent-page/agent-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'agentLogin', component: AgentPageComponent },
  { path: 'contact', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'contact', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
