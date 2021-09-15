package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.EmailValidation;

public interface EmailValidationRepository extends JpaRepository<EmailValidation, String> {
	
	EmailValidation findByEmailAndNumberValidation(String email, Integer numberValidation);
	
	EmailValidation findByEmailEquals(String email);
	
	EmailValidation findByEmail(String email);
}
