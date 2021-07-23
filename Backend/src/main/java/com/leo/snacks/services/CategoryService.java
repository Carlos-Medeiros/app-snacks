package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Category;
import com.leo.snacks.domain.Product;
import com.leo.snacks.dto.CategoryDTO;
import com.leo.snacks.dto.OnlyCategoryDTO;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.repositories.CategoryRepository;
import com.leo.snacks.repositories.ProductRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;
	
	@Autowired
	private ProductRepository productRepository;

	
	@Transactional(readOnly = true)
	public List<OnlyCategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		return list.stream().map(x -> new OnlyCategoryDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAllCategorys() {
		List<Category> list = repository.findAll();
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public CategoryDTO search(Long id) {
		Category category = repository.getOne(id);
		return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category category = new Category(null, dto.getName());
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			category.getProducts().add(product);
		}
		category = repository.save(category);
		return new CategoryDTO(category);
	}
	
	@Transactional
	public CategoryDTO update(CategoryDTO dto) {
		search(dto.getId());
		Category category = new Category(dto.getId(), dto.getName());
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			category.getProducts().add(product);
		}
		category = repository.save(category);
		return new CategoryDTO(category);
	}
	
	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}

}
