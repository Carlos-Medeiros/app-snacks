package com.leo.snacks.resources;

import com.leo.snacks.dto.AccountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.leo.snacks.dto.UserEmailValidationDTO;
import com.leo.snacks.services.EmailService;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
public class EmailResource {
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/keyValidation")
	public ResponseEntity<UserEmailValidationDTO> keyValidation(@RequestBody UserEmailValidationDTO dto) {
		dto = emailService.keyValidation(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/emailValidator")
	public ResponseEntity<UserEmailValidationDTO> EmailValidator(@RequestBody UserEmailValidationDTO dto) {
		dto = emailService.emailValidator(dto);
		emailService.sendValidation(dto.getEmail(), "Validation code", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/emailExisting")
	public ResponseEntity<UserEmailValidationDTO> emailExisting(@RequestBody UserEmailValidationDTO dto) {
		dto = emailService.emailExisting(dto);
		return ResponseEntity.ok().body(dto);
	}

	@PutMapping("/emailValidator/{email}/{numberKey}")
	public ResponseEntity<UserEmailValidationDTO> update(@PathVariable String email, @PathVariable Integer numberKey) {
		UserEmailValidationDTO dto = emailService.update(email, numberKey);
		emailService.sendValidation(dto.getEmail(), "Validation code", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping("/emailDelete/{email}")
	public ResponseEntity<Void> delete(@PathVariable String email) {
		emailService.delete(email);
		return ResponseEntity.noContent().build();
	}

}
