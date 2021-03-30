package com.leo.snacks.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.DeliverymanEmailValidationDTO;
import com.leo.snacks.services.DeliverymanEmailService;

@RestController
public class DeliverymanEmailResource {
	
	@Autowired
	private DeliverymanEmailService emailService;
	
	@PostMapping("/deliverymanKeyValidation")
	public ResponseEntity<DeliverymanEmailValidationDTO> keyValidation(@RequestBody DeliverymanEmailValidationDTO dto) {
		dto = emailService.keyValidation(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/deliverymanEmailValidator")
	public ResponseEntity<DeliverymanEmailValidationDTO> EmailValidator(@Valid @RequestBody DeliverymanEmailValidationDTO dto) {
		dto = emailService.emailValidator(dto);
		emailService.sendValidation(dto.getEmailMaster(), "Register", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/deliverymanEmailValidator/{email}")
	public ResponseEntity<DeliverymanEmailValidationDTO> update(@PathVariable String email ) {
		DeliverymanEmailValidationDTO dto = emailService.update(email);
		emailService.sendValidation(dto.getEmailMaster(), "Register", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/deliverymanEmailDelete/{email}")
	public ResponseEntity<Void> delete(@PathVariable String email) {
		emailService.delete(email);
		return ResponseEntity.noContent().build();
	}

}
