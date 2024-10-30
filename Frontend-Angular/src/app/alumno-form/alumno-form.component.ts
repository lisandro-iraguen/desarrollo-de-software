import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment'
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Alumno } from '../models/alumno.model';
import { NgbModule, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import _moment from 'moment';

import { AlumnosService } from '../services/alumnos.service';




@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, NgbModule],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css',
  providers: [AlumnosService]

})
export class AlumnoFormComponent {
  private _moment(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @Input() alumno: Alumno = new Alumno(0, '', new Date(Date.now()));

  public toDate: NgbDateStruct = { year: 0, month: 0, day: 0 };;




  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private calendar: NgbCalendar,private alumnosService: AlumnosService ) {

    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getAlumnoById(+id);
    } else {
      let date = this.calendar.getToday();
      this.toDate = date;
    }

   
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

  public getAlumnoById(id: number): void{
    console.log(id);
    this.alumnosService.getAlumnoById(id).subscribe(
      (a: Alumno) => {
        this.alumno = a
        this.toDate = this.dateToNgbDateStruct(this.alumno.fechaNacimiento)   
      },
      error => {
        console.error('Error al cargar el alumno:', error);
      }
    );
  }


  guardarAlumno() {
    this.alumno.fechaNacimiento = this.ngbDateStructToDate(this.toDate);
    this.alumnosService.updateAlumno(this.alumno).subscribe(
      response => {
        this.router.navigate(['/alumnos']); // Navigate after successful creation
        console.log('Alumno actualizado:', response);
      },
      error => {
        console.error('Error al actualizar el alumno:', error);
      }
    );

 
  }
}
