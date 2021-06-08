package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.UsedCoupon;

public interface UsedCouponRepository extends JpaRepository<UsedCoupon, String> {
	
	UsedCoupon findByEmailAndUsedCode(String email, String usedCode);

}
