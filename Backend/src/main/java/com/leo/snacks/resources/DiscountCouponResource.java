package com.leo.snacks.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.dto.DiscountCouponDTO;
import com.leo.snacks.services.DiscountCouponService;

@RestController
@RequestMapping(value="/discount")
public class DiscountCouponResource {
	
	@Autowired
	private DiscountCouponService service;
	
	@GetMapping("/{code}")
	public ResponseEntity<DiscountCouponDTO> find(@PathVariable String code) {
		DiscountCouponDTO dto = service.search(code);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<DiscountCouponDTO>> findAll() {
		List<DiscountCouponDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);	
	}

	@PostMapping
	public ResponseEntity<DiscountCouponDTO> insert(@Valid @RequestBody DiscountCouponDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
