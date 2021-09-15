package com.leo.snacks.resources;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.leo.snacks.config.JwtService;
import com.leo.snacks.dto.AccountDTO;
import com.leo.snacks.dto.CredentialsDTO;
import com.leo.snacks.dto.TokenDTO;
import com.leo.snacks.exception.invalidPasswordException;
import com.leo.snacks.services.AccountService;

@RestController
@RequestMapping(value="/user")
public class AccountResource {
	
	@Autowired
	private AccountService service;

	@Autowired
	private JwtService jwtService;
	
	@GetMapping
	public ResponseEntity<List<AccountDTO>> findAll() {
		List<AccountDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/details")
	public ResponseEntity<AccountDTO> search(Principal principal) {
		String emailUser = principal.getName();
		AccountDTO dto = service.search(emailUser);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/register")
	public ResponseEntity<AccountDTO> register(@RequestBody AccountDTO dto) {
		dto = service.register(dto);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping("/login")
	public TokenDTO authenticate(@RequestBody CredentialsDTO dto) {
		try{
			UserDetails userAuthenticated = service.authenticate(dto);
			String token = jwtService.generateToken(dto);
			return new TokenDTO(dto.getEmail(), token);
		} catch (UsernameNotFoundException | invalidPasswordException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
		}
	}

	@PatchMapping("/{email}")
	@ResponseStatus(NO_CONTENT)
	public void forgotYourPassword(@PathVariable String email, @RequestBody AccountDTO dto) { service.forgotYourPassword(dto, email); }

	@PatchMapping("/name")
	@ResponseStatus(NO_CONTENT)
	public void editName(Principal principal, @RequestBody AccountDTO dto) {
		String email = principal.getName();
		service.editName(dto, email);
	}

	@PatchMapping("/phone")
	@ResponseStatus(NO_CONTENT)
	public void editPhoneNumber(Principal principal, @RequestBody AccountDTO dto) {
		String email = principal.getName();
		service.editPhoneNumber(dto, email);
	}

	@PatchMapping("/password")
	@ResponseStatus(NO_CONTENT)
	public void editPassword(Principal principal, @RequestBody AccountDTO dto) {
		String email = principal.getName();
		service.editPassword(dto, email);
	}

	@DeleteMapping("/delete")
	@ResponseStatus(NO_CONTENT)
	public void delete(Principal principal) {
		String email = principal.getName();
		service.delete(email);
	}

	@PatchMapping("/admin/{id}")
	@ResponseStatus(NO_CONTENT)
	public void editAdmin(@PathVariable Long id) {
		service.editAdmin(id);
	}

	@PatchMapping("/accepted/{id}")
	@ResponseStatus(NO_CONTENT)
	public void updateAccepted(@PathVariable Long id) {
		service.updateAccepted(id);
	}

	@PatchMapping("/rejected/{id}")
	@ResponseStatus(NO_CONTENT)
	public void updateRejected(@PathVariable Long id) {
		service.updateRejected(id);
	}

	@PatchMapping("/disabled/{id}")
	@ResponseStatus(NO_CONTENT)
	public void updateDisabled(@PathVariable Long id) {
		service.updateDisabled(id);
	}

}
