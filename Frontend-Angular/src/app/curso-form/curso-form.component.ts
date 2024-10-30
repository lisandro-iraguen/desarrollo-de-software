import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Curso } from '../models/curso.model';
import { Tema } from '../models/tema.model';
import { Docente } from '../models/docente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Alumno } from '../models/alumno.model';
import { NgbModule,NgbDateStruct,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,NgbModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css'
})
export class CursoFormComponent {
  @Input() curso: Curso = new Curso(
    0,
    new Tema(0, '', ''),
    new Date(),
    new Date(),
    new Docente(0, '', 0),
    0,
    []);

  temas: Tema[] = [];
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  selectedAlumnos?: Alumno[] = [];

  private apiUrl = environment.apiUrl;
  private recurso: String = "/curso";
  public inicioFormattedDate: NgbDateStruct={ year: 0, month: 0, day: 0 }; ;
  public finFormattedDate: NgbDateStruct={ year: 0, month: 0, day: 0 }; ;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private calendar: NgbCalendar) {
    this.curso.precio=undefined;

   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCursoById(+id).subscribe((c) =>{    
        console.log("cargar curso:")     
        console.log(c)     
        this.curso = c        
        this.selectedAlumnos = this.curso.alumnos;
        console.log(this.selectedAlumnos)  

        this.inicioFormattedDate = this.dateToNgbDateStruct(this.curso.fechaInicio)
        this.finFormattedDate = this.dateToNgbDateStruct(this.curso.fechaFin)
      });
    }
    this.http.get<Tema[]>(this.apiUrl + "/tema").subscribe((data: Tema[]) => {
      this.temas = data;
      if (id == undefined) {
        this.curso.tema = this.temas[0];
      }
    });
    this.http.get<Docente[]>(this.apiUrl + "/docente").subscribe((data: Docente[]) => {
      this.docentes = data;
      if (id == undefined) {
        this.curso.docente = this.docentes[0];
      }
    });
    this.http.get<Alumno[]>(this.apiUrl + "/alumno").subscribe((data: Alumno[]) => {      
      this.alumnos = data;
    });




    
  }
  public dateToNgbDateStruct(d: Date): NgbDateStruct {
    const date = d instanceof Date ? d : new Date(d);


    let a = date.getUTCDate();
    let b = date.getUTCMonth() + 1;
    let c = date.getUTCFullYear();


    return {
      day: a,
      month: b, // Months are zero-based in JavaScript Date
      year: c
    };
  }

  public ngbDateStructToDate(date: NgbDateStruct): Date {

    return new Date(date.year, date.month - 1, date.day);
  }
  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}${this.recurso}/${id}`).pipe(
      catchError(error => {
        console.error('Error al cargar el curso:', error);
        return throwError(error);
      })
    );
  }

 
  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => +option.value);
    this.selectedAlumnos = this.alumnos.filter(alumno => selectedOptions.includes(alumno.id));
  }
  getSelectedAlumnos(): Alumno[] {
    return this.alumnos.filter(alumno => this.selectedAlumnos?.includes(alumno));
  }
  getFormattedPrice(): string {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(0);
  }
  guardarCurso() {

    this.curso.alumnos = this.getSelectedAlumnos();
    this.curso.fechaInicio = this.ngbDateStructToDate(this.inicioFormattedDate);
    this.curso.fechaFin = this.ngbDateStructToDate(this.finFormattedDate);

    if (this.curso.id === 0) {
      console.log(this.curso);
      this.http.post<Curso>(this.apiUrl + this.recurso, this.curso, httpOptions).pipe(
        tap(response => {
          console.log('curso creado:', response);
          this.router.navigate(['/cursos']); // Navigate after successful creation
        }),
        catchError(error => {
          console.error('Error al guardar el curso:', error);
          return throwError(error);
        })
      ).subscribe();
    } else {
      this.http.put<Curso>(`${this.apiUrl}${this.recurso}/${this.curso.id}`, this.curso, httpOptions).pipe(
        tap(response => {
          console.log('curso actualizado:', response);
          this.router.navigate(['/cursos']); // Navigate after successful update
        }),
        catchError(error => {
          console.error('Error al actualizar el curso:', error);
          return throwError(error);
        })
      ).subscribe();
    }
  }


}
