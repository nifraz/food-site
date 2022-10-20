import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  loginMode: boolean = true;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  modelForm!: FormGroup;
  alertSubscription?: Subscription;
  storeSubscription?: Subscription;

  @ViewChild(PlaceholderDirective) errorPlaceHolder!: PlaceholderDirective;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group(
      {
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        //'confirmPassword': ['', []]
      }
    );

    this.storeSubscription = this.store.select('auth').subscribe(
      state => {
        console.log('state changed', state);
        this.loading = state.loading;
        this.error = state.error;
        this.errorMessage = state.errorMessage;
        if (this.error) {
          this.showErrorAlert(this.errorMessage);
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
    this.storeSubscription?.unsubscribe();
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (this.modelForm.invalid) {
      return;
    }

    const authRequestModel = {
      ...this.modelForm.value,
      returnSecureToken: true
    }

    if (this.loginMode) {
      this.store.dispatch(new AuthActions.LoginStart(authRequestModel));
    }
    else {
      this.store.dispatch(new AuthActions.RegisterStart(authRequestModel));
    }

    this.modelForm.reset();
  }

  private showErrorAlert(message: string) {
    this.errorPlaceHolder.viewContainerRef.clear();
    const componetRef = this.errorPlaceHolder.viewContainerRef.createComponent(AlertComponent);
    componetRef.instance.message = message;
    this.alertSubscription = componetRef.instance.close.subscribe(() => {
      this.errorPlaceHolder.viewContainerRef.clear();
      this.store.dispatch(new AuthActions.ClearError());
      this.alertSubscription?.unsubscribe();
    });
  }

  onAlertClose() {
    //this.error = false;
  }
}
