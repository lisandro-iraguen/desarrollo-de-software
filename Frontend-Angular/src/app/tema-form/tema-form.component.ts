import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tema } from '../models/tema.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TemasService } from '../services/temas.service';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tema-form',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './tema-form.component.html',
  styleUrl: './tema-form.component.css',
  providers: [TemasService]
})
export class TemaFormComponent {
  @Input() tema: Tema = new Tema(0, '', '');
  private apiUrl = environment.apiUrl;
  private recurso:String="/tema";

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router,private temaService:TemasService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTemaById(+id); 
    }
  }

  getTemaById(id: number): void{
    this.temaService.getTemaById(id).subscribe(
      (d: Tema) => {
        this.tema =d;   
      },
      error => {
        console.error('Error al cargar el alumno:', error);
      }
    );
  }

  guardarTema(){
    this.temaService.updateTema(this.tema).subscribe(
      response => {
        this.router.navigate(['/temas']); // Navigate after successful creation
        console.log('Docente actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el Docente:', error);
      }
    );

  }
}
