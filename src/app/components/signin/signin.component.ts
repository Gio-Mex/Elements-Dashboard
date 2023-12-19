import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SignInComponent {
  router: Router = inject(Router);
  userName!: string;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password).subscribe((data: any) => {
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      this.authService.createUser(
        data.email,
        data.localId,
        data.idToken,
        expirationDate
      );
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      this.authService.isLoggedIn = true;
      this.router.navigate(['/page1']);
      this.firebaseService.getUserName().subscribe((userName: string) => {
        this.userName = userName;
        this.openSnackBar();
      });
    },
    (error: any) => {
      if (error.status === 400) {
        this.snackBar.open('Invalid email or password, please try again.', undefined, {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }

    });
    ;
    form.reset();
  }

  openSnackBar() {
    this.snackBar.open(`Welcome back, ${this.userName}!`, undefined, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
