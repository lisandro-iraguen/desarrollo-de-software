import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { CursosListComponent } from "./cursos-list/cursos-list.component";
import { AlumnoComponent } from "./abm-alumno/alumno.component";
import { DocenteComponent } from "./abm-docente/docente.component";
import { TemaComponent } from "./abm-tema//tema.component";
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent,CursosListComponent,AlumnoComponent,TemaComponent,DocenteComponent,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstitutoEducativo';
}
