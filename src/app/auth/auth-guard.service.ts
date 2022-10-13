import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authService.user.pipe(map(user => !!user), tap(auth => {
    //   if (!auth) {
    //     this.router.navigate(['/auth']);
    //   }
    // }));
    return this.store.select('auth').pipe(
      take(1),
      map(state => state.user),
      map(user => !!user ? true : this.router.createUrlTree(['/auth']))
    );
  }
}
