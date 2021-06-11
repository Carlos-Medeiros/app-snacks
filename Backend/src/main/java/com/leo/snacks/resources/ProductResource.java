package com.leo.snacks.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.services.ProductService;

@RestController
@RequestMapping(value = "/products")
public class ProductResource {

	@Autowired
	private ProductService service;
	
	@GetMapping
	public ResponseEntity<List<ProductDTO>> findAll() {
		List<ProductDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/discount")
	public ResponseEntity<List<ProductDTO>> findAllDiscount() {
		List<ProductDTO> list = service.findAllDiscount();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> find(@PathVariable Long id) {
		ProductDTO dto = service.search(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("/findByName/{name}")
	public ResponseEntity<List<ProductDTO>> findByName(@PathVariable String name) {
		List<ProductDTO> list= service.findByName(name);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<ProductDTO> insert(@RequestBody ProductDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@RequestBody ProductDTO dto, @PathVariable Long id) {
		dto.setId(id);
		dto = service.update(dto);
		return ResponseEntity.ok().body(dto); 
	}
	
	@PutMapping("/discount/{id}")
	public ResponseEntity<ProductDTO> discount(@RequestBody Double discount, @PathVariable Long id) {
		ProductDTO dto = service.discount(discount, id);
		return ResponseEntity.ok().body(dto); 
	}
	
	@PutMapping("/discount/reverse/{id}")
	public ResponseEntity<ProductDTO> discountReverse(@PathVariable Long id) {
		ProductDTO dto = service.discountReverse(id);
		return ResponseEntity.ok().body(dto); 
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
