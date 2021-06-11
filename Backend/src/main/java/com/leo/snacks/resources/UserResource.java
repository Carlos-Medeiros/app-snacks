package com.leo.snacks.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.dto.UserDTO;
import com.leo.snacks.services.UserService;

@RestController
public class UserResource {
	
	@Autowired
	private UserService service;
	
	@PostMapping("/register")
	public ResponseEntity<EditUserDTO> register(@RequestBody EditUserDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<EditUserDTO> login(@RequestBody EditUserDTO dto) {
		dto = service.login(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editName/{email}")
	public ResponseEntity<EditUserDTO> editName(@RequestBody EditUserDTO dto, @PathVariable String email) {
		dto = service.editName(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editPhoneNumber/{email}")
	public ResponseEntity<EditUserDTO> editPhoneNumber(@RequestBody EditUserDTO dto, @PathVariable String email) {
		dto = service.editPhoneNumber(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/editPassword/{email}")
	public ResponseEntity<EditUserDTO> editPassword(@RequestBody EditUserDTO dto, @PathVariable String email) {
		dto = service.editPassword(dto, email);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("/favoriteProducts/{email}")
	public ResponseEntity<UserDTO> favoriteProducts(@PathVariable String email) {
		UserDTO dto = service.favoriteProducts(email);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/favoriteProductsInsert/{email}/{id}")
	public ResponseEntity<UserDTO> favoriteProductsInsert(@PathVariable String email, @PathVariable Long id) {
		UserDTO dto = service.favoriteProductsInsert(email, id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/favoriteProductsRemove/{email}/{id}")
	public ResponseEntity<UserDTO> favoriteProductsRemove(@PathVariable String email, @PathVariable Long id) {
		UserDTO dto = service.favoriteProductsRemove(email, id);
		return ResponseEntity.ok().body(dto);
	}
	
	
	@DeleteMapping("/delete/{email}")
	public ResponseEntity<Void> delete(@PathVariable String email) {
		service.delete(email);
		return ResponseEntity.noContent().build();
	}

}
