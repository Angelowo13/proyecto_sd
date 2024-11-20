import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:3002'; 

  constructor(private http: HttpClient) {}

  registrarTarea(tarea: any): Observable<any> {
    const body = tarea;  // Aquí se pasa directamente el objeto tarea
    return this.http.post(`${this.apiUrl}/registrar_tarea`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio principal', error);
        return throwError(error);
      })
    );
  }
  

  verTareas(id_usuario: number): Observable<any> {
    const body = { id_usuario };

    return this.http.post(`${this.apiUrl}/vertareas`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio principal', error);
        return throwError(error);
      })
    );
  }

  actualizarEstado(id:any ,estado: any): Observable<any> {
    const body = { id, estado };
 
    return this.http.post(`${this.apiUrl}/utarea`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio principal', error);
        return throwError(error);
      })
    );
  }
}