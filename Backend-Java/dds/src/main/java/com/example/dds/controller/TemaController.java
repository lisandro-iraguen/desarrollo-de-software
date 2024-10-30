package com.example.dds.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dds.entity.Tema;
import com.example.dds.service.TemaService;

@RestController
@RequestMapping("/tema")
public class TemaController {

    @Autowired
    private TemaService temaService;

    @GetMapping
    public List<Tema> getAllTemas() {
        return temaService.getAllTemas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tema> getTemaById(@PathVariable Long id) {
        Tema tema = temaService.getTemaById(id);
        if (tema != null) {
            return ResponseEntity.ok(tema);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Tema createTema(@RequestBody Tema tema) {
        return temaService.saveTema(tema);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tema> updateTema(@PathVariable Long id, @RequestBody Tema temaDetails) {
        Tema tema = temaService.getTemaById(id);
        if (tema != null) {
            tema.setNombre(temaDetails.getNombre());
            tema.setDescripcion(temaDetails.getDescripcion());
            return ResponseEntity.ok(temaService.saveTema(tema));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTema(@PathVariable Long id) {
        temaService.deleteTema(id);
        return ResponseEntity.noContent().build();
    }
}
