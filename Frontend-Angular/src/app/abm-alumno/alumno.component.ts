import { Component } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { environment } from '../environments/environment'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlumnosService } from '../services/alumnos.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule,HttpClientModule,NgxPaginationModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
  providers: [AlumnosService]

})
export class AlumnoComponent {
  alumnos: Alumno[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  constructor(private router: Router,private alumnosService: AlumnosService) {}
  ngOnInit(): void {
    this.alumnosService.fetchAlumnos();
    this.alumnosService.alumnos$.subscribe((data: Alumno[]) => {
      this.alumnos = data;
    });

    
  }
  nuevoAlumno(): void {
    this.router.navigate(['/nuevo-alumno']);
  }

  editarAlumno(alumno: Alumno): void {
    this.router.navigate(['/editar-alumno', alumno.id]);
  }

  borrarAlumno(id: number): void {
    this.alumnosService.borrarAlumno(id);
  }
}
