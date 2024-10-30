package com.example.dds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dds.entity.Tema;

@Repository
public interface TemaRepository extends JpaRepository<Tema, Long> {
}
