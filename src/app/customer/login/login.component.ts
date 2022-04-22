import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertsAndNotificationsService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.authService.loginEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    } else {
      this.alertService.presentToast('Invalid form');
    }
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle();
  }

  ngOnInit(): void {}
}

export type loginInfo = {
  email: string;
  password: string;
};
