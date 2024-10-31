import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Docente } from '../models/docente.model';
import { DocentesService } from '../services/docentes.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Component({
  selector: 'app-docente-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './docente-form.component.html',
  styleUrl: './docente-form.component.css',
  providers: [DocentesService]
})
export class DocenteFormComponent {
  @Input() docente: Docente = new Docente(0, '', 0);
  private apiUrl = environment.apiUrl;
  private recurso: String = "/docente";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private docenteService: DocentesService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDocenteById(+id);    }
  }

  getDocenteById(id: number): void{
    this.docenteService.getDocenteById(id).subscribe(
      (d: Docente) => {
        this.docente =d;   
      },
      error => {
        console.error('Error al cargar el alumno:', error);
      }
    );
  }


  guardarDocente() {
    this.docenteService.updateDocente(this.docente).subscribe(
      response => {
        this.router.navigate(['/docentes']); // Navigate after successful creation
        console.log('Docente actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el Docente:', error);
      }
    );

  }
}
