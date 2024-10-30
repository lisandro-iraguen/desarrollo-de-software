import { Docente } from "./docente.model";
import { Tema } from "./tema.model";
import { Alumno } from './alumno.model';


    export class Curso {
        constructor(
            public id: number,
            public tema: Tema,
            public fechaInicio: Date,
            public fechaFin: Date,
            public docente: Docente,
            public precio?: number,
            public alumnos?: Array<Alumno>
          ) {}
}
