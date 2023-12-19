import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUp(email, password).subscribe((data: any) => {
      const expirationDate = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      this.authService.createUser(
        data.email,
        data.localId,
        data.idToken,
        expirationDate
      );
      localStorage.setItem('user', JSON.stringify(this.authService.user));

      this.firebaseService
        .insertUser('/users.json', {
          name: name,
          email: email,
        })
        .subscribe();
    });
    form.reset();
  }
}
