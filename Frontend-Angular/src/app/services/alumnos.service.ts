import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = environment.apiUrl;
  private recurso = '/alumno'; // Replace with your actual resource path
  private alumnos: Alumno[] = [];
 

  constructor(private http: HttpClient) { }

  private alumnosSubject = new BehaviorSubject<Alumno[]>([]);
  public alumnos$ = this.alumnosSubject.asObservable();

  public fetchAlumnos(): void {
    this.http.get<Alumno[]>(this.apiUrl + this.recurso).subscribe((data: Alumno[]) => {
      this.alumnosSubject.next(data);
    });
  }

  public borrarAlumno(id: number): void {
    this.http.delete(`${this.apiUrl}${this.recurso}/${id}`).subscribe(() => {
      const currentAlumnos = this.alumnosSubject.getValue();
      const updatedAlumnos = currentAlumnos.filter(a => a.id !== id);
      this.alumnosSubject.next(updatedAlumnos);
    });
  }

  public getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}${this.recurso}/${id}`).pipe(
      catchError(error => {
        console.error('Error al cargar el alumno:', error);
        return throwError(error);
      })
    );
  }

  public updateAlumno(alumno: Alumno): Observable<Alumno> {
    if (alumno.id === 0) {
      return this.http.post<Alumno>(`${this.apiUrl}${this.recurso}`, alumno).pipe(
        tap(response => {
          console.log('Alumno actualizado:', response);        
        }),
        catchError(error => {
          console.error('Error al actualizar el alumno:', error);
          return throwError(error);
        })
      );
    } else {
      return this.http.put<Alumno>(`${this.apiUrl}${this.recurso}/${alumno.id}`, alumno).pipe(
        tap(response => {
          console.log('Alumno actualizado:', response);
        
        }),
        catchError(error => {
          console.error('Error al actualizar el alumno:', error);
          return throwError(error);
        })
      );
    }
  }
}


