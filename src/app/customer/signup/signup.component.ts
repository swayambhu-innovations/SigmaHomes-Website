import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthenticationService, private alertService: AlertsAndNotificationsService) {}

  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  submitSignupForm() {
    if (this.signupForm.valid && this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      this.authService.signUpWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username);
    }
    else {
      this.alertService.presentToast('Invalid form');
    }
  }

  signUpWithGoogle() {
    this.authService.signInWithGoogle();
  }

  ngOnInit(): void {}
}

export type signupInfo = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
