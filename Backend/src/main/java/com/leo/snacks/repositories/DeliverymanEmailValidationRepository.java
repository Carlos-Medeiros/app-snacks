package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.DeliverymanEmailValidation;

public interface DeliverymanEmailValidationRepository extends JpaRepository<DeliverymanEmailValidation, String> {
	
	DeliverymanEmailValidation findByEmailEquals(String email);
	
	DeliverymanEmailValidation findByEmail(String email);

}
