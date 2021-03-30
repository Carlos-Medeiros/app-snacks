package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

	Owner findByEmailAndPassword(String email, String password);
	
	Owner findByEmailEquals(String email);
	
	Owner findByEmail(String email);
}
