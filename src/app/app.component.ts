import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Elements Dahboard';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      this.authService.createUser(
        user.email,
        user.id,
        user._token,
        user._expirationDate
      );
    }
  }
}
