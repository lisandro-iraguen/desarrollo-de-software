#scripts de creacion de tablas
drop table my_table.curso_alumno;
drop table my_table.Curso;
drop table my_table.Tema;
drop table my_table.alumno;
drop table my_table.Docente;




CREATE TABLE my_table.Alumno (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

CREATE TABLE my_table.Docente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    legajo BIGINT NOT NULL
);

CREATE TABLE my_table.Tema (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);


CREATE TABLE my_table.Curso (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tema_id BIGINT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    docente_id BIGINT,
    precio DOUBLE NOT NULL,
    FOREIGN KEY (tema_id) REFERENCES Tema(id),
    FOREIGN KEY (docente_id) REFERENCES Docente(id)
);

CREATE TABLE my_table.Curso_Alumno (
    curso_id BIGINT,
    alumno_id BIGINT,
    PRIMARY KEY (curso_id, alumno_id)
);



-- Insertar datos en la tabla Tema
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Matemáticas', 'Curso de matemáticas avanzadas');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Historia', 'Curso de historia mundial');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Física', 'Curso de física teórica');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Química', 'Curso de química orgánica');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Biología', 'Curso de biología molecular');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Literatura', 'Curso de literatura clásica');
INSERT INTO my_table.Tema (nombre, descripcion) VALUES ('Filosofía', 'Curso de filosofía moderna');


INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Carlos García', 12345);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Ana Martínez', 67890);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Luis Fernández', 11223);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('María González', 44556);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Jorge Ramírez', 77889);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Laura Torres', 99001);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Pedro Sánchez', 22334);
INSERT INTO my_table.Docente (nombre, legajo) VALUES ('Sofía Díaz', 55667);

INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Juan Pérez', '2000-01-15');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('María López', '1999-05-23');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Carlos Sánchez', '2001-07-30');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Ana Gómez', '2002-11-12');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Luis Martínez', '1998-03-05');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Laura Fernández', '2000-09-17');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Pedro Ramírez', '2001-12-25');
INSERT INTO my_table.Alumno (nombre, fecha_nacimiento) VALUES ('Sofía Torres', '1999-08-08');
