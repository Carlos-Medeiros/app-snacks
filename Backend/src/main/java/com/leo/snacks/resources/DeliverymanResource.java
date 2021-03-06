package com.leo.snacks.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.EditDeliverymanDTO;
import com.leo.snacks.services.DeliverymanService;

@RestController
public class DeliverymanResource {
	
	@Autowired
	private DeliverymanService service;
	
	@GetMapping("/deliveryman")
	public ResponseEntity<List<EditDeliverymanDTO>> findAll() {
		List<EditDeliverymanDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{email}/status")
	public ResponseEntity<EditDeliverymanDTO> search(@PathVariable String email) {
		EditDeliverymanDTO dto = service.search(email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/register/deliveryman")
	public ResponseEntity<EditDeliverymanDTO> register(@RequestBody EditDeliverymanDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/login/deliveryman")
	public ResponseEntity<EditDeliverymanDTO> login(@RequestBody EditDeliverymanDTO dto) {
		dto = service.login(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/forgotYourPassword/deliveryman/{email}")
	public ResponseEntity<EditDeliverymanDTO> forgotYourPassword(@RequestBody EditDeliverymanDTO dto, @PathVariable String email) {
		dto = service.forgotYourPassword(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editName/deliveryman/{email}")
	public ResponseEntity<EditDeliverymanDTO> editName(@RequestBody EditDeliverymanDTO dto, @PathVariable String email) {
		dto = service.editName(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editPhoneNumber/deliveryman/{email}")
	public ResponseEntity<EditDeliverymanDTO> editPhoneNumber(@RequestBody EditDeliverymanDTO dto, @PathVariable String email) {
		dto = service.editPhoneNumber(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editPassword/deliveryman/{email}")
	public ResponseEntity<EditDeliverymanDTO> editPassword(@RequestBody EditDeliverymanDTO dto, @PathVariable String email) {
		dto = service.editPassword(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/delete/deliveryman/{email}")
	public ResponseEntity<Void> delete(@PathVariable String email) {
		service.delete(email);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{email}/accepted")
	public ResponseEntity<EditDeliverymanDTO> updateAccepted(@PathVariable String email) {
		EditDeliverymanDTO dto = service.updateAccepted(email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{email}/rejected")
	public ResponseEntity<EditDeliverymanDTO> updateRejected(@PathVariable String email) {
		EditDeliverymanDTO dto = service.updateRejected(email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{email}/disabled")
	public ResponseEntity<EditDeliverymanDTO> updateDisabled(@PathVariable String email) {
		EditDeliverymanDTO dto = service.updateDisabled(email);
		return ResponseEntity.ok().body(dto);
	}
}
