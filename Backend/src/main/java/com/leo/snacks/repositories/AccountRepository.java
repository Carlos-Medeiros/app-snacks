package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Account;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {

	Account findByEmail(String email);

	List<Account> findAllByOrderByIdAsc();

}
