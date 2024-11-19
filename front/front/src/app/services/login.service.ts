import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Usuario {
  correo: string;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/';  // URL de tu API

  constructor(private http: HttpClient) { }

  login(email: string,contrasena:string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post<any>(`${this.apiUrl}login`, body);
  }
}
