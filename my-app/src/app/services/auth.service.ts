import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) {}
  
  login(email: string, password: string): boolean {
    if (email === 'admin' && password === '12345678') {
      const adminUser = {
        email: 'admin',
        role: 'admin',
        name: 'Administrador'
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    }
    return false;
  }

  register(email: string, password: string, userData: any): boolean {
    try {
      console.log('Intento de registro:', { email, userData });
      return false; 
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    console.log('Sesión cerrada correctamente');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): any | null {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
  
  getCurrentUserId(): string | null {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  }
}