import { Component } from '@angular/core';

import { RegistrarService } from '../../services/registrar.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [HttpClientModule, FormsModule,CommonModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  message: string = '';
  errorMessage: string = '';

  constructor(private registrarService: RegistrarService, private router: Router) {}

  onSubmit(form: NgForm) {
    const { email, password, nombre } = form.value;

    this.registrarService.registrar(email, password, nombre).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.message = 'Registro exitoso. Redirigiendo a login...';
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        this.errorMessage = 'Ocurrió un error durante el registro. Intenta de nuevo.';
      }
    );
  }
}
