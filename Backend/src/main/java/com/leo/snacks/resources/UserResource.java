package com.leo.snacks.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.dto.UserValidationDTO;
import com.leo.snacks.services.EmailServiceImpl;
import com.leo.snacks.services.UserService;

@RestController
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private EmailServiceImpl emailService;
	
	@PostMapping("/emailValidator")
	public ResponseEntity<UserValidationDTO> EmailValidator(@Valid @RequestBody UserValidationDTO dto) {
		dto = service.emailValidator(dto);
		emailService.sendValidation(dto.getEmail(), "teste", String.valueOf(dto.getNumberValidation()));
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/register")
	public ResponseEntity<EditUserDTO> register(@Valid @RequestBody EditUserDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}

}
