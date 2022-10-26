import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  authenticated: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      map(state => state.user),
    ).subscribe(user => {
      this.authenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData(): void {
    this.store.dispatch(new RecipesActions.SaveRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

}
