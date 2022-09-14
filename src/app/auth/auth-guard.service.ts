import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authService.user.pipe(map(user => !!user), tap(auth => {
    //   if (!auth) {
    //     this.router.navigate(['/auth']);
    //   }
    // }));
    return this.authService.user.pipe(
      take(1),
      map(user => !!user ? true : this.router.createUrlTree(['/auth']))
    );
  }
}
