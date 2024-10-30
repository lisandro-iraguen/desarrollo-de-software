import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { Docente } from '../models/docente.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private apiUrl = environment.apiUrl;
  private recurso:String="/docente";
  private docentes: Docente[] = [];

  constructor(private http: HttpClient) { }

  private docenteSubject = new BehaviorSubject<Docente[]>([]);
  public docentes$ = this.docenteSubject.asObservable();

  public fetchDocentes(): void {
    this.http.get<Docente[]>(this.apiUrl + this.recurso).subscribe((data: Docente[]) => {
      this.docenteSubject.next(data);
    });
  }

  public borrarDocente(id: number): void {
    this.http.delete(`${this.apiUrl}${this.recurso}/${id}`).subscribe(() => {
      const currentDocente = this.docenteSubject.getValue();
      const updatedDocente = currentDocente.filter(a => a.id !== id);
      this.docenteSubject.next(updatedDocente);
    });
  }

  public getDocenteById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}${this.recurso}/${id}`).pipe(
      catchError(error => {
        console.error('Error al cargar el dicebte:', error);
        return throwError(error);
      })
    );
  }

  public updateAlumno(docente: Docente): Observable<Docente> {
    if (docente.id === 0) {
      return this.http.post<Docente>(`${this.apiUrl}${this.recurso}`, docente).pipe(
        tap(response => {
          console.log('docente actualizado:', response);        
        }),
        catchError(error => {
          console.error('Error al actualizar el docente:', error);
          return throwError(error);
        })
      );
    } else {
      return this.http.put<Docente>(`${this.apiUrl}${this.recurso}/${docente.id}`, docente).pipe(
        tap(response => {
          console.log('docente actualizado:', response);
        
        }),
        catchError(error => {
          console.error('Error al actualizar el docente:', error);
          return throwError(error);
        })
      );
    }
  }
  
}
