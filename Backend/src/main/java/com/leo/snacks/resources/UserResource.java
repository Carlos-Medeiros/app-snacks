package com.leo.snacks.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.services.UserService;

@RestController
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@PostMapping("/register")
	public ResponseEntity<EditUserDTO> register(@Valid @RequestBody EditUserDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<EditUserDTO> login(@Valid @RequestBody EditUserDTO dto) {
		dto = service.login(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/forgotYourPassword/{email}")
	public ResponseEntity<EditUserDTO> forgotYourPassword(@Valid @RequestBody EditUserDTO dto, @PathVariable String email) {
		dto = service.forgotYourPassword(dto, email);
		return ResponseEntity.ok().body(dto);
	}

}
