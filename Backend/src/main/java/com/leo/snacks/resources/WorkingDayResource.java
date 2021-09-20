package com.leo.snacks.resources;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.util.List;

import javax.validation.Valid;

import com.leo.snacks.dto.HuorNowDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
	@PostMapping
	public ResponseEntity<WorkingDayDTO> insert(@Valid @RequestBody WorkingDayDTO dto) {
		dto = service.insert(dto);
		return ResponseEntity.ok().body(dto);
	}

	@PatchMapping
	public ResponseEntity<WorkingDayDTO> isOpen(@RequestBody HuorNowDTO hours) {
		WorkingDayDTO dto = service.isOpen(hours);
		return ResponseEntity.ok().body(dto);
	}

	@PatchMapping("/{id}/name")
	@ResponseStatus(NO_CONTENT)
	public void setName(@PathVariable Long id, @RequestBody WorkingDayDTO dto) {
		service.setName(dto, id);
	}

	@PatchMapping("/{id}/opening-time")
	@ResponseStatus(NO_CONTENT)
	public void setOpeningTime(@PathVariable Long id, @RequestBody WorkingDayDTO dto) {
		service.setOpeningTime(dto, id);
	}

	@PatchMapping("/{id}/closing-time")
	@ResponseStatus(NO_CONTENT)
	public void setClosingTime(@PathVariable Long id, @RequestBody WorkingDayDTO dto) {
		service.setClosingTime(dto, id);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
