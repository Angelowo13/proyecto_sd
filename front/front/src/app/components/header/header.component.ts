import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit {
  isLoggedIn = false;
  nombreUsuario = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef  // Para forzar la actualización del componente
  ) {}

  ngOnInit(): void {
    this.checkUserStatus(); // Comprobar el estado de login al cargar el componente
  }

  // Comprobar si el usuario está logueado desde localStorage
  checkUserStatus(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.isLoggedIn = true;
      this.nombreUsuario = JSON.parse(usuario).nombre_usuario;
    }
  }

  // LogOut: Eliminar datos del usuario y redirigir
  logout(): void {
    localStorage.removeItem('usuario');
    this.isLoggedIn = false;
    this.nombreUsuario = '';
    this.router.navigate(['/login']);  // Redirigir al login
  }

  // Forzar la actualización del estado en el header después del login
  updateLoginState() {
    this.checkUserStatus();
    this.cdr.detectChanges();  // Forzar la actualización del componente
  }
}