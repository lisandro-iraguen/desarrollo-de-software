package com.example.dds.entity;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="Alumno")
public class Alumno {

    @Id
    private Long id;

    @Column(name="nombre")
    private String nombre;

    @Column(name="fechaNacimiento")
    private Date fechaNacimiento;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    @Column(name="fechaNacimiento")
    @Temporal(TemporalType.DATE)
    public void setFechaNacimiento(Date fechaNacimiento) throws ParseException {
    	DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    	Date todayWithZeroTime = formatter.parse(formatter.format(fechaNacimiento));    	
        this.fechaNacimiento = todayWithZeroTime;
    }

    // Constructors
    public Alumno() { }

    public Alumno(Long id, String nombre, Date fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }
}