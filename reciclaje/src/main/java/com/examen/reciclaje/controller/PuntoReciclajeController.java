package com.examen.reciclaje.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repository.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173") 
public class PuntoReciclajeController {

	private final PuntoReciclajeRepository reciclajeRepo;

	public PuntoReciclajeController(PuntoReciclajeRepository reciclajeRepo) {
		super();
		this.reciclajeRepo = reciclajeRepo;
	}

	@PostMapping
	public ResponseEntity<PuntoReciclaje> registrarPunto(@RequestBody PuntoReciclaje punto) {
		try {
			PuntoReciclaje nuevoPunto = reciclajeRepo.save(punto);
			return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPunto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping
	public ResponseEntity<List<PuntoReciclaje>> listarPuntos() {
		List<PuntoReciclaje> lista = reciclajeRepo.findAll();
		return ResponseEntity.ok(lista);
	}
}