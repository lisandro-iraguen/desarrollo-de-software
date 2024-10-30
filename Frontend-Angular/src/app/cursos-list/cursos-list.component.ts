import { Component,OnInit } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CursosService } from '../services/cursos.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,NgxPaginationModule ],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.css',
  providers: [CursosService]
})
export class CursosListComponent {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  private apiUrl = environment.apiUrl;
  fechaFin: string = "";

  private recurso:String="/curso";
  cursos: Curso[] = [];


  constructor(private router: Router,private http: HttpClient,private cursosService:CursosService) {}

  ngOnInit(): void {
    this.cursosService.fetchCursos();
    this.cursosService.cursos$.subscribe((data: Curso[]) => {
      this.cursos = data;
    });

  }

  nuevoCurso(): void {
    this.router.navigate(['/nuevo-curso']);
  }

  editarCurso(tema: Curso): void {
    this.router.navigate(['/editar-curso', tema.id]);
  }

  borrarCurso(id: number): void {
    this.cursosService.borrarCurso(id);

  }
  public filtrarCurso(): void {
    this.cursosService.filtrarCurso(this.fechaFin).subscribe(
      (data: Curso[]) => {
        this.cursos = data;
      },
      error => {
        console.error('Error al filtrar los cursos:', error);
      }
    );
  }
 
}
