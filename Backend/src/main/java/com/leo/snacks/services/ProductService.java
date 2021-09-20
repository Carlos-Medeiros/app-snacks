package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.dto.AmountDiscountDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Product;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.exception.BusinessRuleException;
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
		Product product = new Product(null, dto.getName(), dto.getPrice(), dto.getDescription(), dto.getImageUri(), dto.isInventory(), false, null);
		if(dto.getName() == null) {
			throw new BusinessRuleException("Product name cannot be null");
		}
		if(dto.getPrice() == null) {
			throw new BusinessRuleException("Product price cannot be null");
		}
		if(dto.getDescription() == null) {
			throw new BusinessRuleException("Product description cannot be null");
		}
		if(dto.getImageUri() == null) {
			throw new BusinessRuleException("Product image uri cannot be null");
		}
		if(dto.isInventory() != false && dto.isInventory() != true) {
			throw new BusinessRuleException("Product inventory cannot be null");
		} else {
			product = repository.save(product);
			return new ProductDTO(product);
		}
	}
	
	@Transactional
	public ProductDTO update(ProductDTO dto) {
		search(dto.getId());
		Product product = repository.getOne(dto.getId());
		if (dto.getName() == null) {
			product.getName();
		}
		else {
			product.setName(dto.getName());
		}
		if (dto.getPrice() == null) {
			product.getPrice();
		}
		else {
			product.setPrice(dto.getPrice());
		}
		if (dto.getDescription() == null) {
			product.getDescription();
		}
		else {
			product.setDescription(dto.getDescription());
		}
		if (dto.getImageUri() == null) {
			product.getImageUri();
		}
		else {
			product.setImageUri(dto.getImageUri());
		}
		if (dto.isInventory() != false || dto.isInventory() != true ) {
			product.isInventory();
		}
		else {
			product.setInventory(dto.isInventory());
		}
		if (dto.isDiscount() != false || dto.isDiscount() != true ) {
			product.isDiscount();
		}
		else {
			product.setDiscount(dto.isDiscount());
		}
		product = repository.save(product);
		return new ProductDTO(product);
	}

	@Transactional
	public void discount(AmountDiscountDTO discount, Long id) {
		repository
				.findById(id)
				.map( product -> {
					if (product.isDiscount() == false) {
						product.setPercentageDiscount((discount.getAmount() * 100) / product.getPrice());
						product.setPrice(product.getPrice() - discount.getAmount());
						product.setDiscount(true);
					} else {
						throw new BusinessRuleException("The product is already on a discount");
					}
					return repository.save(product);
				}).orElseThrow(() -> new BusinessRuleException("Product not found"));
	}

	@Transactional
	public void discountReverse(Long id) {
		repository
				.findById(id)
				.map( product -> {
					if (product.isDiscount() == true) {
						product.setPrice(product.getPrice() * 100 / (100 - product.getPercentageDiscount()));
						product.setPercentageDiscount(0.0);
						product.setDiscount(false);
					} else {
						throw new BusinessRuleException("The product is not discounted");
					}
					return repository.save(product);
				}).orElseThrow(() -> new BusinessRuleException("Product not found"));
	}

	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}
}
