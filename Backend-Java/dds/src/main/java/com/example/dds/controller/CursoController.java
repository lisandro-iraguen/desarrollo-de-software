package com.example.dds.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dds.entity.Curso;
import com.example.dds.service.CursoService;

@RestController
@RequestMapping("/curso")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public List<Curso> getAllCursos() {
        return cursoService.getAllCursos();
    }
    
    
    @GetMapping("/filter/Date") // cursos que finalizan un día determinado
    public List<Curso> getAllCursosEndDate(String dateInString) {
    	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
    	 LocalDate localDate = LocalDate.parse(dateInString, formatter);

         // Convert LocalDate to java.sql.Date
         Date sqlDate = Date.valueOf(localDate);    	
        return cursoService.getByDate(sqlDate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getCursoById(@PathVariable Long id) {
        Curso curso = cursoService.getCursoById(id);
        if (curso != null) {
            return ResponseEntity.ok(curso);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Curso createCurso(@RequestBody Curso curso) {
        return cursoService.saveCurso(curso);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
        Curso curso = cursoService.getCursoById(id);
        if (curso != null) {
            curso.setTema(cursoDetails.getTema());
            curso.setFechaInicio(cursoDetails.getFechaInicio());
            curso.setFechaFin(cursoDetails.getFechaFin());
            curso.setDocente(cursoDetails.getDocente());
            curso.setPrecio(cursoDetails.getPrecio());
            curso.setAlumnos(cursoDetails.getAlumnos());
            return ResponseEntity.ok(cursoService.saveCurso(curso));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        cursoService.deleteCurso(id);
        return ResponseEntity.noContent().build();
    }
}
