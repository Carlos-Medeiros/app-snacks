package com.leo.snacks.resources;

import java.util.Random;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.services.EmailServiceImpl;
import com.leo.snacks.services.UserService;

@RestController
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private EmailServiceImpl emailService;

	@GetMapping("/emailValidator")
	public ResponseEntity<Void> sendEmailValidator(@Valid @RequestBody EditUserDTO dto) {
		Random random = new Random();
		Integer numberRandom = random.nextInt(1000000 - 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = random.nextInt(1000000 - 100000);
		}
		
		emailService.sendValidation(dto.getEmail(), "teste", String.valueOf(numberRandom));
		
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/register")
	public ResponseEntity<EditUserDTO> register(@Valid @RequestBody EditUserDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}

}
