import { Component } from '@angular/core';
import { environment } from '../environments/environment'
import { Docente } from '../models/docente.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DocentesService } from '../services/docentes.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule,HttpClientModule,NgxPaginationModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css',
  providers: [DocentesService]
})
export class DocenteComponent {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  docentes: Docente[] = [];


  constructor(private router: Router,private docenteService:DocentesService) {}
  ngOnInit(): void {
    this.docenteService.fetchDocentes();
    this.docenteService.docentes$.subscribe((data: Docente[]) => {
      this.docentes = data;
    });

    
  }




  nuevoDocente(): void {
    this.router.navigate(['/nuevo-docente']);
  }

  editarDocente(docente: Docente): void {
    this.router.navigate(['/editar-docente', docente.id]);
  }

  borrarDocente(id: number): void {
    this.docenteService.borrarDocente(id);
  }
}
