package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Deliveryman;

public interface DeliverymanRepository extends JpaRepository<Deliveryman, Long> {

	Deliveryman findByEmailAndPassword(String email, String password);
	
	Deliveryman findByEmailEquals(String email);
	
	Deliveryman findByEmail(String email);
}
