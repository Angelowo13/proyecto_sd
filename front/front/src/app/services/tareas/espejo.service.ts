import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspejoService {

 
  private apiUrl = 'http://localhost:3003';  // Cambiado para apuntar al servidor espejo

  constructor(private http: HttpClient) {}

  // Método para registrar tarea
  registrarTarea(tarea: any): Observable<any> {
    const body = tarea;  // Aquí se pasa directamente el objeto tarea
    return this.http.post(`${this.apiUrl}/registrar-tarea`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio espejo', error);
        return throwError(error);
      })
    );
  }

  // Método para ver tareas
  verTareas(id_usuario: number): Observable<any> {
    const body = { id_usuario };

    return this.http.post(`${this.apiUrl}/ver-tarea`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio espejo', error);
        return throwError(error);
      })
    );
  }

  // Método para actualizar el estado de una tarea
  actualizarEstado(id: any, estado: any): Observable<any> {
    const body = { id, estado };

    return this.http.post(`${this.apiUrl}/actualizar-estado`, body).pipe(
      catchError((error) => {
        console.error('Error en el servicio espejo', error);
        return throwError(error);
      })
    );
  }
}
