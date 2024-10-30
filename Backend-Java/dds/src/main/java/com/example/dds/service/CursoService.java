package com.example.dds.service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dds.entity.Alumno;
import com.example.dds.entity.Curso;
import com.example.dds.repository.CursoRepository;

@Service
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    public List<Curso> getAllCursos() {
        return cursoRepository.findAll();
    }

    public Curso getCursoById(Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    public Curso saveCurso(Curso curso) {
    	
        return cursoRepository.save(curso);
    }

    public void deleteCurso(Long id) {
        cursoRepository.deleteById(id);
    }
    
    public List<Curso> getCursosByDocenteId(Long docenteId) {
    	return cursoRepository.findAll().stream()
                .filter(curso -> curso.getDocente().getId().equals(docenteId))
                .collect(Collectors.toList());
    }
    
    public List<Curso> getByDate(Date date) {
    	return cursoRepository.findByfechaFinAfter(date);
    }
    

}
