package com.leo.snacks.resources;

import java.net.URI;
import java.util.List;

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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.dto.OrderDTO;
import com.leo.snacks.services.OrderService;

@RestController
@RequestMapping(value = "/orders")
public class OrderResource {

	@Autowired
	private OrderService service;
	
	@GetMapping("/pending")
	public ResponseEntity<List<OrderDTO>> findAllPending() {
		List<OrderDTO> list = service.findAllPending();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/confirmed")
	public ResponseEntity<List<OrderDTO>> findAllConfirmed() {
		List<OrderDTO> list = service.findAllConfirmed();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/readyForDelivery")
	public ResponseEntity<List<OrderDTO>> findAllReadyForDelivery() {
		List<OrderDTO> list = service.findAllReadyForDelivery();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/readyForPickup")
	public ResponseEntity<List<OrderDTO>> findAllReadyForPickup() {
		List<OrderDTO> list = service.findAllReadyForPickup();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/delivered")
	public ResponseEntity<List<OrderDTO>> findAllDelivered() {
		List<OrderDTO> list = service.findAllDelivered();
		return ResponseEntity.ok().body(list);
	}

	@PostMapping
	public ResponseEntity<OrderDTO> insert(@RequestBody OrderDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping("/{id}/pending")
	public ResponseEntity<OrderDTO> setPending(@PathVariable Long id) {
		OrderDTO dto = service.setPending(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}/confirmed")
	public ResponseEntity<OrderDTO> setConfirmed(@PathVariable Long id) {
		OrderDTO dto = service.setConfirmed(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}/ready")
	public ResponseEntity<OrderDTO> setReady(@PathVariable Long id) {
		OrderDTO dto = service.setReady(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}/pickup")
	public ResponseEntity<OrderDTO> setPickup(@PathVariable Long id) {
		OrderDTO dto = service.setPickup(id);
		return ResponseEntity.ok().body(dto);
	}
	
	
	@PutMapping("/{id}/delivered")
	public ResponseEntity<OrderDTO> setDelivered(@PathVariable Long id) {
		OrderDTO dto = service.setDelivered(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
