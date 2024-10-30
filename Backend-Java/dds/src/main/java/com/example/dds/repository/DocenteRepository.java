package com.example.dds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dds.entity.Docente;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Long> {
}
