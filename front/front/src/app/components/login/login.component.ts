import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.loginService.login(email, password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));  // Guarda el usuario en localStorage
        this.router.navigate(['/']);  // Redirige a la página principal
      },
      (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';  // Mensaje de error
      }
    );

    this.message = 'Formulario enviado. Revisa la consola para los datos ingresados.';
  }
}
