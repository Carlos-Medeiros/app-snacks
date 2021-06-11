package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Product;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		List<Product> list = repository.findAllByOrderByName();
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAllDiscount() {
		List<Product> list = repository.findAllByOrderByName();
		list = repository.findByDiscount(true);
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public ProductDTO search(Long id) {
		Product product = repository.getOne(id);
		return new ProductDTO(product);
	}
	
	@Transactional
	public List<ProductDTO> findByName(String name) {
		List<Product> list = repository.findByNameContains(name);
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product product = new Product(null, dto.getName(), dto.getPrice(), dto.getDescription(), dto.getImageUri(), dto.isInventory(), dto.isDiscount(), null);
		product = repository.save(product);
		return new ProductDTO(product);	
	}
	
	@Transactional
	public ProductDTO update(ProductDTO dto) {
		search(dto.getId());
		Product product = new Product(null, dto.getName(), dto.getPrice(), dto.getDescription(), dto.getImageUri(), dto.isInventory(), dto.isDiscount(), null);
		product = repository.save(product);
		return new ProductDTO(product);
	}
	
	@Transactional
	public ProductDTO discount(Double discount, Long id) {
		Product product = repository.getOne(id);
		if (product.isDiscount() == false) {
			product.setPercentageDiscount((discount * 100) / product.getPrice());
			product.setPrice(product.getPrice() - discount);
			product.setDiscount(true);
			product = repository.save(product);
			return new ProductDTO(product);
		}
		else {
			return new ProductDTO(null);
		}
	}
	
	@Transactional
	public ProductDTO discountReverse(Long id) {
		Product product = repository.getOne(id);
		if (product.isDiscount() == true) {
			product.setPrice(product.getPrice() * 100 / (100 - product.getPercentageDiscount()));
			product.setPercentageDiscount(0.0);
			product.setDiscount(false);
			product = repository.save(product);
			return new ProductDTO(product);
		}
		else {
			return new ProductDTO(null);
		}
	}
	
	
	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}
}
