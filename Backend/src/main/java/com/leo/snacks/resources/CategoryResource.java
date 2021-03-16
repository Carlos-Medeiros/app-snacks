package com.leo.snacks.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.leo.snacks.domain.Category;
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
	
	@GetMapping(value="/page")
	public ResponseEntity<Page<OnlyCategoryDTO>> findPage(
			@RequestParam(value="page", defaultValue="0")Integer page, 
			@RequestParam(value="linesPerPage", defaultValue="24")Integer linesPerPage, 
			@RequestParam(value="ordeBy", defaultValue="name")String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC")String direction) {
		Page<Category> list = service.findPage(page, linesPerPage, orderBy, direction);
		Page<OnlyCategoryDTO> listDTO = list.map(x -> new OnlyCategoryDTO(x));
		return ResponseEntity.ok().body(listDTO);	
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
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}