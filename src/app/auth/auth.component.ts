import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseModel } from './auth-response-model';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  modelForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group(
      {
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        //'confirmPassword': ['', []]
      }
    );
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

    this.loading = true;

    let authResponseObservable!: Observable<AuthResponseModel>;
    if (this.loginMode) {
      authResponseObservable = this.authService.login(authRequestModel);
    }
    else {
      authResponseObservable = this.authService.register(authRequestModel);
    }

    authResponseObservable.subscribe(
      {
        next: item => {
          //console.log(item);
          this.router.navigate(['/recipes']);
          this.error = false;
          this.loading = false;
        },
        error: (err: Error) => {
          //console.error(err);
          this.errorMessage = err.message;
          this.error = true;
          this.loading = false;
        }
      }
    );

    this.modelForm.reset();
  }

}
