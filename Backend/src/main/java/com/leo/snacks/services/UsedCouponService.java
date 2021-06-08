package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.UsedCoupon;
import com.leo.snacks.dto.UsedCouponDTO;
import com.leo.snacks.repositories.DiscountCouponRepository;
import com.leo.snacks.repositories.UsedCouponRepository;

@Service
public class UsedCouponService {
        
	@Autowired
	private UsedCouponRepository repository;
	
	@Autowired
	private DiscountCouponRepository discountRepository;

	@Transactional
	public UsedCouponDTO couponValidation(UsedCouponDTO dto) {
		UsedCoupon usedCoupon = new UsedCoupon(dto.getEmail(), dto.getUsedCode());
		if (discountRepository.findByCode(dto.getUsedCode()) != null) {
			if (repository.findByEmailAndUsedCode(dto.getEmail(), dto.getUsedCode()) == null) {
				return new UsedCouponDTO(usedCoupon);
			}
			else {
				return new UsedCouponDTO(null);
			}
		}
		else {
			return new UsedCouponDTO(null); 
		}
	}
	
    
	/*@Transactional
	public UsedCouponDTO registerUsedCoupon(UsedCouponDTO dto) {		
		UsedCoupon usedCoupon = new UsedCoupon(dto.getEmail(), dto.getUsedCode());
		if (repository.findByEmailAndUsedCode(dto.getEmail(), dto.getUsedCode()) == null) {
			usedCoupon = repository.save(usedCoupon);
			return new UsedCouponDTO(usedCoupon);
		}
		else {
			return new  UsedCouponDTO(null);
		}
	}*/
    
}