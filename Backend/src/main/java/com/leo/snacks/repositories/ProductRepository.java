package com.leo.snacks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	List<Product> findAllByOrderByName();
	
	List<Product> findByDiscount(boolean discount);
	
	List<Product> findByNameContains(String name);
}
