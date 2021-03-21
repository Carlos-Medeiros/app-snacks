package com.leo.snacks.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.UserEmailValidationDTO;
import com.leo.snacks.services.EmailService;

@RestController
public class EmailResource {
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/emailValidator/{email}")
	public ResponseEntity<UserEmailValidationDTO> find(@PathVariable String email) {
		UserEmailValidationDTO dto = emailService.searchEmail(email);
		emailService.sendValidation(dto.getEmail(), "Register", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("/forgotYourPassword/{email}")
	public ResponseEntity<UserEmailValidationDTO> forgouYourPassword(@PathVariable String email) {
		UserEmailValidationDTO dto = emailService.searchEmail(email);
		emailService.sendValidation(dto.getEmail(), "Forgot Your Password", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	
	@PostMapping("/emailValidator")
	public ResponseEntity<UserEmailValidationDTO> EmailValidator(@Valid @RequestBody UserEmailValidationDTO dto) {
		dto = emailService.emailValidator(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/emailValidator/{email}")
	public ResponseEntity<UserEmailValidationDTO> update(@PathVariable String email ) {
		UserEmailValidationDTO dto = emailService.update(email);
		return ResponseEntity.ok().body(dto);
	}

}
