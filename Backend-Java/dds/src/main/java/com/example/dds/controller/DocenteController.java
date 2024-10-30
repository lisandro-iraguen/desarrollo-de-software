package com.example.dds.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dds.entity.Curso;
import com.example.dds.entity.Docente;
import com.example.dds.service.DocenteService;
import com.example.dds.service.CursoService;
@RestController
@RequestMapping("/docente")
public class DocenteController {

    @Autowired
    private DocenteService docenteService;    
    private CursoService cursoService;
    @GetMapping
    public List<Docente> getAllDocentes() {
        return docenteService.getAllDocentes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Docente> getDocenteById(@PathVariable Long id) {
        Docente docente = docenteService.getDocenteById(id);
        if (docente != null) {
            return ResponseEntity.ok(docente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Docente createDocente(@RequestBody Docente docente) {
        return docenteService.saveDocente(docente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Docente> updateDocente(@PathVariable Long id, @RequestBody Docente docenteDetails) {
        Docente docente = docenteService.getDocenteById(id);
        if (docente != null) {
            docente.setNombre(docenteDetails.getNombre());
            docente.setLegajo(docenteDetails.getLegajo());
            return ResponseEntity.ok(docenteService.saveDocente(docente));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/mis-cursos/{id}")
    public ResponseEntity<List<Curso>> misCursos(@PathVariable Long id) {
        Docente docente = docenteService.getDocenteById(id);
        List<Curso> cursos = cursoService.getCursosByDocenteId(id);       
        return ResponseEntity.ok(cursos);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocente(@PathVariable Long id) {
        docenteService.deleteDocente(id);
        return ResponseEntity.noContent().build();
    }
}
