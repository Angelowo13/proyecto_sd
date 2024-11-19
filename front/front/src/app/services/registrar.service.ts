import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  private apiUrl = 'http://localhost:3001/';  // URL de tu API

  constructor(private http: HttpClient) { }

  login(email: string,contrasena:string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post<any>(`${this.apiUrl}registro`, body);
  }  
}
