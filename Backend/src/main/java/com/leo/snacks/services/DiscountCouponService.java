package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.DiscountCoupon;
import com.leo.snacks.dto.DiscountCouponDTO;
import com.leo.snacks.repositories.DiscountCouponRepository;

@Service
public class DiscountCouponService {

	@Autowired
	private DiscountCouponRepository repository;
	
	@Transactional(readOnly = true)
	public List<DiscountCouponDTO> findAll() {
		List<DiscountCoupon> list = repository.findAll();
		return list.stream().map(x -> new DiscountCouponDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public DiscountCouponDTO search(String code) {
		DiscountCoupon discountCoupon = repository.findByCode(code);
		return new DiscountCouponDTO(discountCoupon);
	}
	
	@Transactional(readOnly = true)
	public DiscountCouponDTO searchId(Long id) {
		DiscountCoupon discountCoupon = repository.getOne(id);
		return new DiscountCouponDTO(discountCoupon);
	}
	
	@Transactional
	public DiscountCouponDTO insert(DiscountCouponDTO dto) {
		DiscountCoupon discountCoupon = new DiscountCoupon(null, dto.getCode(), dto.getDiscountAmount(), dto.getMinimunDiscountAmount());
		discountCoupon = repository.save(discountCoupon);
		return new DiscountCouponDTO(discountCoupon);
	}
	
	@Transactional
	public void delete(Long id) {
		searchId(id);
		repository.deleteById(id);
	}
}
