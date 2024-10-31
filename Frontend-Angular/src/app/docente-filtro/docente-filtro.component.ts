import { Component } from '@angular/core';
import { DocentesService } from '../services/docentes.service';
import { Docente } from '../models/docente.model';
import { Curso } from '../models/curso.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docente-filtro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente-filtro.component.html',
  styleUrl: './docente-filtro.component.css',
  providers: [DocentesService]
})
export class DocenteFiltroComponent {
  docentes: Docente[] = [];
  cursos: Curso[] = [];
  constructor(private docenteService:DocentesService) {}
  ngOnInit(): void {
    this.docenteService.fetchDocentes();
    this.docenteService.docentes$.subscribe((data: Docente[]) => {
      this.docentes = data;
    });

    
  }

  onDocenteChange(event: Event): void {
    const selectedDocenteId = (event.target as HTMLSelectElement).value;
    this.docenteService.getCursosByDocenteId(Number(selectedDocenteId)).subscribe((data: Curso[]) => {
      this.cursos = data;
    });
  }
}
