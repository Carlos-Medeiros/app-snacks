package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmailAndPassword(String email, String password);
	
	User findByEmailEquals(String email);
	
	User findByEmail(String email);
}
