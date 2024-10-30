import { Component,OnInit } from '@angular/core';
import { Tema } from '../models/tema.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TemasService } from '../services/temas.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tema',
  standalone: true,
  imports: [CommonModule,HttpClientModule,NgxPaginationModule],
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css',
  providers: [TemasService]
})
export class TemaComponent {
  itemsPerPage: number = 5;
  currentPage: number = 1;
  temas: Tema[] = [];

  constructor(private router: Router,private temaSerive: TemasService) {}

  ngOnInit(): void {
    this.temaSerive.fetchTemas();
    this.temaSerive.temas$.subscribe((data: Tema[]) => {
      this.temas = data;
    });
  }

  nuevoTema(): void {
    this.router.navigate(['/nuevo-tema']);
  }

  editarTema(tema: Tema): void {
    this.router.navigate(['/editar-tema', tema.id]);
  }

  borrarTema(id: number): void {
    this.temaSerive.borrarTemas(id);
  }

 
}
