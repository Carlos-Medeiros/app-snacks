package com.leo.snacks.resources;

import static org.springframework.http.HttpStatus.NO_CONTENT;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.dto.CategoryDTO;
import com.leo.snacks.dto.OnlyCategoryDTO;
import com.leo.snacks.services.CategoryService;

@RestController
@RequestMapping(value="/categorys")
public class CategoryResource {
	
	@Autowired
	private CategoryService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoryDTO> find(@PathVariable Long id) {
		CategoryDTO dto = service.search(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<OnlyCategoryDTO>> findAll() {
		List<OnlyCategoryDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);	
	}
	
	@GetMapping("/products")
	public ResponseEntity<List<CategoryDTO>> findAllCategorys() {
		List<CategoryDTO> list = service.findAllCategorys();
		return ResponseEntity.ok().body(list);	
	}
	
	@PostMapping
	public ResponseEntity<CategoryDTO> insert(@Valid @RequestBody CategoryDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CategoryDTO> update(@Valid @RequestBody CategoryDTO dto, @PathVariable Long id ) {
		dto.setId(id);
		dto = service.update(dto);
		return ResponseEntity.ok().body(dto);
	}

	@PatchMapping("/{id}/name")
	@ResponseStatus(NO_CONTENT)
	public void editName(@PathVariable Long id, @RequestBody CategoryDTO dto) {
		service.editName(dto, id);
	}

	@PatchMapping("/{id}/insert/{idProduct}")
	@ResponseStatus(NO_CONTENT)
	public void insertProduct(@PathVariable Long id, @PathVariable Long idProduct) {
		service.insertProduct(id, idProduct);
	}

	@PatchMapping("/{id}/remove/{idProduct}")
	@ResponseStatus(NO_CONTENT)
	public void removeProduct(@PathVariable Long id, @PathVariable Long idProduct) {
		service.removeProduct(id, idProduct);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
