package com.example.dds.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dds.entity.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

	List<Curso> findByfechaFinAfter(Date date);
}
