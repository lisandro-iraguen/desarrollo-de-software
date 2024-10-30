import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { Curso } from '../models/curso.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = environment.apiUrl;
  private recurso:String="/curso";
  private cursos: Curso[] = [];
  constructor(private http: HttpClient) { }
 
  private cursosSubject = new BehaviorSubject<Curso[]>([]);
  public cursos$ = this.cursosSubject.asObservable();

  public fetchCursos(): void {
    this.http.get<Curso[]>(this.apiUrl + this.recurso).subscribe((data: Curso[]) => {
      this.cursosSubject.next(data);
    });
  }

  public borrarCurso(id: number): void {
    this.http.delete(`${this.apiUrl}${this.recurso}/${id}`).subscribe(() => {
      const currentCurso = this.cursosSubject.getValue();
      const updatedCurso = currentCurso.filter(a => a.id !== id);
      this.cursosSubject.next(updatedCurso);
    });
  }

  public getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}${this.recurso}/${id}`).pipe(
      catchError(error => {
        console.error('Error al cargar el alumno:', error);
        return throwError(error);
      })
    );
  }
  public filtrarCurso(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}${this.recurso}/filter/Date?dateInString=${fechaFin}`).pipe(
      catchError(error => {
        console.error('Error al filtrar los cursos:', error);
        return throwError(error);
      })
    );
  }
  public updateCurso(curso: Curso): Observable<Curso> {
    if (curso.id === 0) {
      return this.http.post<Curso>(`${this.apiUrl}${this.recurso}`, curso).pipe(
        tap(response => {
          console.log('curso actualizado:', response);        
        }),
        catchError(error => {
          console.error('Error al actualizar el curso:', error);
          return throwError(error);
        })
      );
    } else {
      return this.http.put<Curso>(`${this.apiUrl}${this.recurso}/${curso.id}`, curso).pipe(
        tap(response => {
          console.log('curso actualizado:', response);
        
        }),
        catchError(error => {
          console.error('Error al actualizar el curso:', error);
          return throwError(error);
        })
      );
    }
  }
}
