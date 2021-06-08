package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.DiscountCoupon;

public class DiscountCouponDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String code;
	private Double discountAmount;
	private Double minimunDiscountAmount;
	
	public DiscountCouponDTO() {
	}
	
	public DiscountCouponDTO(Long id, String code, Double discountAmount, Double minimunDiscountAmount) {
		this.id = id;
		this.code = code;
		this.discountAmount = discountAmount;
		this.minimunDiscountAmount = minimunDiscountAmount;
	}
	
	public DiscountCouponDTO(DiscountCoupon entity) {
		id = entity.getId();
		code = entity.getCode();
		discountAmount = entity.getDiscountAmount();
		minimunDiscountAmount = entity.getMinimunDiscountAmount();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public Double getMinimunDiscountAmount() {
		return minimunDiscountAmount;
	}

	public void setMinimunDiscountAmount(Double minimunDiscountAmount) {
		this.minimunDiscountAmount = minimunDiscountAmount;
	}
	
}
