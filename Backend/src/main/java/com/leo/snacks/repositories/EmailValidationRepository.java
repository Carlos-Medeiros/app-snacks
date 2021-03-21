package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.EmailValidation;
import com.leo.snacks.domain.User;

public interface EmailValidationRepository extends JpaRepository<EmailValidation, String> {
	
	EmailValidation findByEmailEquals(String email);
	
	EmailValidation findByEmail(String email);

}
