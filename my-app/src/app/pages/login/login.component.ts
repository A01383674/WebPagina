import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router
  ) {}

  onLogin() {
    try {
      if (!this.email || !this.password) {
        this.errorMessage = 'Por favor ingrese email y contraseña';
        return;
      }
  
      console.log('Intentando login con:', {
        email: this.email,
        password: this.password
      });
      if (this.email === 'admin' && this.password === '1234') {
        console.log('Login exitoso como admin');
        this.errorMessage = '';
        const adminUser = {
          email: 'admin',
          role: 'admin',
          name: 'Administrador'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        this.router.navigate(['/home']).then(success => {
          console.log('Navegación exitosa:', success);
          if (!success) {
            console.warn('La ruta /home puede no estar configurada correctamente');
          }
        }).catch(err => {
          console.error('Error en la navegación:', err);
        });
      } else if (this.email === 'guest' && this.password === '5678') {
        console.log('Login exitoso como guest');
        this.errorMessage = '';
        const guestUser = {
          email: 'guest',
          role: 'guest',
          name: 'Invitado'
        };
        localStorage.setItem('currentUser', JSON.stringify(guestUser));
        this.router.navigate(['/home']).then(success => {
          console.log('Navegación exitosa:', success);
          if (!success) {
            console.warn('La ruta /home puede no estar configurada correctamente');
          }
        }).catch(err => {
          console.error('Error en la navegación:', err);
        });
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos';
        console.warn('Credenciales inválidas');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Ocurrió un error durante el inicio de sesión';
    }
  }
}