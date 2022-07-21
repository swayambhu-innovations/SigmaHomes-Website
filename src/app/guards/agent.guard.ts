import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProvider } from '../providers/data.provider';

@Injectable({
  providedIn: 'root'
})
export class AgentGuard implements CanActivate {
  constructor(private dataProvider: DataProvider, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (
        this.dataProvider.loggedIn &&
        this.dataProvider.userData?.access.access === 'Agent'
      ) {
        return true;
      } else {
        if(this.dataProvider.userData?.access.access === 'Admin'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigateByUrl('');
        }
        return false;
      }
  }
  
}
