package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Order;


public interface OrderRepository extends JpaRepository<Order, Long> {
	
}
