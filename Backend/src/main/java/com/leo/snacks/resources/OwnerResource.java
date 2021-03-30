package com.leo.snacks.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.OwnerDTO;
import com.leo.snacks.services.OwnerService;

@RestController
public class OwnerResource {
	
	@Autowired
	private OwnerService service;

	@PostMapping("/login/owner")
	public ResponseEntity<OwnerDTO> login(@RequestBody OwnerDTO dto) {
		dto = service.login(dto);
		return ResponseEntity.ok().body(dto);
	}

}
