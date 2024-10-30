import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { Tema } from '../models/tema.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TemasService {
  private apiUrl = environment.apiUrl;
  private recurso:String="/tema";
  private docentes: Tema[] = [];
  constructor(private http: HttpClient) { }

  private temaSubject = new BehaviorSubject<Tema[]>([]);
  public temas$ = this.temaSubject.asObservable();

  public fetchTemas(): void {
    this.http.get<Tema[]>(this.apiUrl + this.recurso).subscribe((data: Tema[]) => {
      this.temaSubject.next(data);
    });
  }

  public borrarTemas(id: number): void {
    this.http.delete(`${this.apiUrl}${this.recurso}/${id}`).subscribe(() => {
      const currentTemas = this.temaSubject.getValue();
      const updatedTemas = currentTemas.filter(a => a.id !== id);
      this.temaSubject.next(updatedTemas);
    });
  }

  public getTemaById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}${this.recurso}/${id}`).pipe(
      catchError(error => {
        console.error('Error al cargar el tema:', error);
        return throwError(error);
      })
    );
  }

  public updateTema(tema: Tema): Observable<Tema> {
    if (tema.id === 0) {
      return this.http.post<Tema>(`${this.apiUrl}${this.recurso}`, tema).pipe(
        tap(response => {
          console.log('tema actualizado:', response);        
        }),
        catchError(error => {
          console.error('Error al actualizar el tema:', error);
          return throwError(error);
        })
      );
    } else {
      return this.http.put<Tema>(`${this.apiUrl}${this.recurso}/${tema.id}`, tema).pipe(
        tap(response => {
          console.log('tema actualizado:', response);
        
        }),
        catchError(error => {
          console.error('Error al actualizar el tema:', error);
          return throwError(error);
        })
      );
    }
  } 
}
