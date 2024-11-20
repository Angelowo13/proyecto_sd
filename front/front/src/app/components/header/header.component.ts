import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  nombreUsuario = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    if (isPlatformBrowser(this.platformId)) {  // Verificar que estamos en el navegador
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        this.isLoggedIn = true;
        this.nombreUsuario = JSON.parse(usuario).nombre_usuario;
      }
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {  // Solo acceder a localStorage en el navegador
      localStorage.removeItem('usuario');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }
}
