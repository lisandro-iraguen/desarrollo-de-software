package com.example.dds.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dds.entity.Tema;
import com.example.dds.repository.TemaRepository;

@Service
public class TemaService {
    @Autowired
    private TemaRepository temaRepository;

    public List<Tema> getAllTemas() {
        return temaRepository.findAll();
    }

    public Tema getTemaById(Long id) {
        return temaRepository.findById(id).orElse(null);
    }

    public Tema saveTema(Tema tema) {
        return temaRepository.save(tema);
    }

    public void deleteTema(Long id) {
        temaRepository.deleteById(id);
    }
}
