package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.DiscountCoupon;

public interface DiscountCouponRepository extends JpaRepository<DiscountCoupon, Long> {

	DiscountCoupon findByCode(String code);

}
