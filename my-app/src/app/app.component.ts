import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AppComponent {
  title = 'my-app';
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}