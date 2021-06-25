package com.leo.snacks.resources;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.WorkingDayDTO;
import com.leo.snacks.services.WorkingDayService;

@RestController
@RequestMapping(value="/workingDay")
public class WorkingDayResource {
	
	@Autowired
	private WorkingDayService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<WorkingDayDTO> find(@PathVariable Long id) {
		WorkingDayDTO dto = service.search(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<WorkingDayDTO>> findAll() {
		List<WorkingDayDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);	
	}
	
	@PutMapping
	public ResponseEntity<WorkingDayDTO> isOpen() {
		WorkingDayDTO dto = service.isOpen();
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<WorkingDayDTO> insert(@Valid @RequestBody WorkingDayDTO dto) {
		dto = service.insert(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<WorkingDayDTO> update(@RequestBody WorkingDayDTO dto, @PathVariable Long id) {
		dto.setId(id);
		dto = service.update(dto);
		return ResponseEntity.ok().body(dto); 
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
