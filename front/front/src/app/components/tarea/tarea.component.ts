import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tareas/tarea.service';
import { EspejoService } from '../../services/tareas/espejo.service'; // Asegurarse de importar el servicio espejo
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit {
  tareas: any[] = [];
  nuevaTarea = {
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_termino: ''
  };

  constructor(
    private tareasService: TareaService,
    private espejoService: EspejoService, // Inyectar el servicio espejo
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  // Cargar las tareas del usuario
  cargarTareas(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const id_usuario = JSON.parse(usuario).id;
  
      // Intentar cargar tareas desde el servicio principal
      this.tareasService.verTareas(id_usuario).subscribe(
        (response) => {
          this.tareas = response.row;  // Asignar las tareas a la propiedad
        },
        (error) => {
          // Verificar si el error es debido a un fallo de conexión
          if (error.status === 0 || error.status === 503 || error.status === 504) {
            // Llamar al servicio espejo si falla la conexión al principal
            this.espejoService.verTareas(id_usuario).subscribe(
              (response) => {
                this.tareas = response.tareasTransformadas;  // Asignar las tareas del servicio espejo
              },
              (error) => {
                alert('No se pudo cargar las tareas desde el servidor espejo. Por favor, intente más tarde.');
              }
            );
          } else {
            alert('Error al cargar las tareas desde el servicio principal. Intente nuevamente.');
          }
        }
      );
    }
  }
  
  
  // Agregar una nueva tarea
  agregarTarea(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const id_usuario = JSON.parse(usuario).id;
  
      // Asegúrate de que los campos sean enviados con los nombres correctos que espera el backend
      const nuevaTarea = {
        id_usuario,
        titulo: this.nuevaTarea.titulo,
        descripcion: this.nuevaTarea.descripcion,
        fecha_i: this.nuevaTarea.fecha_inicio, // Renombrado de fecha_inicio a fecha_i
        fecha_t: this.nuevaTarea.fecha_termino  // Renombrado de fecha_termino a fecha_t
      };
  
      // Llamar al servicio para registrar la tarea en el servicio principal
      this.tareasService.registrarTarea(nuevaTarea).subscribe(
        (response) => {
          // Agregar la nueva tarea a la lista
          this.tareas.push(response.tarea);
          // Limpiar el formulario
          this.nuevaTarea = { titulo: '', descripcion: '', fecha_inicio: '', fecha_termino: '' };
        },
        (error) => {
          console.error('Error al agregar tarea en el servicio principal:', error);
          // Si ocurre un error de conexión o cualquier otro error, registrar la tarea en el servicio espejo
          if (error.status === 0 || error.status === 503 || error.status === 504) {
            console.log('Conexión al servidor principal fallida, utilizando el servicio espejo...');
            this.espejoService.registrarTarea(nuevaTarea).subscribe(
              (response) => {
                // Agregar la nueva tarea al espejo
                this.tareas.push(response.tarea);
                this.nuevaTarea = { titulo: '', descripcion: '', fecha_inicio: '', fecha_termino: '' };
              },
              (error) => {
                console.error('Error al agregar tarea en el servicio espejo:', error);
              }
            );
          }
        }
      );
    }
    this.cargarTareas();

  }

  // Modificar el estado de una tarea
  modificarEstado(tarea: any): void {
    this.tareasService.actualizarEstado(tarea.id, tarea.estado).subscribe(
      (response) => {
        console.log('Estado actualizado en el servicio principal:', response);
      },
      (error) => {
        console.error('Error al modificar estado en el servicio principal:', error);
        // Si hay un error, intentar actualizar el estado con el servicio espejo
        if (error.status === 0 || error.status === 503 || error.status === 504) {
          console.log('Conexión al servidor principal fallida, utilizando el servicio espejo...');
          this.espejoService.actualizarEstado(tarea.id, tarea.estado).subscribe(
            (response) => {
              console.log('Estado actualizado en el servicio espejo:', response);
            },
            (error) => {
              console.error('Error al modificar estado en el servicio espejo:', error);
            }
          );
        }
      }
    );
  }
}
