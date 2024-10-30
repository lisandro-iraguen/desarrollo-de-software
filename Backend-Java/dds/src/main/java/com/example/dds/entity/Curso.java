package com.example.dds.entity;

import java.util.Date;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tema tema;

    @Column(name="fechaInicio")
    private Date fechaInicio;

    @Column(name="fechaFin")
    private Date fechaFin;

    @ManyToOne
    private Docente docente;

    @Column(name="precio")
    private Double precio;

    @ManyToMany()
    private List<Alumno> alumno;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tema getTema() {
        return tema;
    }

    public void setTema(Tema tema) {
        this.tema = tema;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

   
   
    
    public List<Alumno> getAlumnos() {
        return alumno;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.alumno = alumnos;
    }

    // Constructors
    public Curso() { }

    public Curso(Long id, Tema tema, Date fechaInicio, Date fechaFin, Docente docente, Double precio, List<Alumno> alumnos) {
        this.id = id;
        this.tema = tema;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.docente = docente;
        this.precio = precio;
        this.alumno = alumnos;
    }
}