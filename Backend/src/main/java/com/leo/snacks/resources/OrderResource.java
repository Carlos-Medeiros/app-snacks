package com.leo.snacks.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.dto.OrderDTO;
import com.leo.snacks.services.OrderService;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping(value = "/orders")
public class OrderResource {

	@Autowired
	private OrderService service;
	
	@GetMapping("/{code}")
	public ResponseEntity<OrderDTO> findCode(@PathVariable Integer code) {
		OrderDTO dto = service.searchCode(code);
		return ResponseEntity.ok().body(dto);
	}
	
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

	@PatchMapping("/{id}/pending")
	@ResponseStatus(NO_CONTENT)
	public void setPending(@PathVariable Long id) {
		service.setPending(id);
	}

	@PatchMapping("/{id}/confirmed")
	@ResponseStatus(NO_CONTENT)
	public void setConfirmed(@PathVariable Long id) { service.setConfirmed(id); }

	@PatchMapping("/{id}/delivery")
	@ResponseStatus(NO_CONTENT)
	public void setDelivery(@PathVariable Long id) {
		service.setDelivery(id);
	}

	@PatchMapping("/{id}/pickup")
	@ResponseStatus(NO_CONTENT)
	public void setPickup(@PathVariable Long id) {
		service.setPickup(id);
	}

	@PatchMapping("/{id}/delivered")
	@ResponseStatus(NO_CONTENT)
	public void setDelivered(@PathVariable Long id) {
		service.setDelivered(id);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
