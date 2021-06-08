package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.UsedCoupon;

public class UsedCouponDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email;
	private String usedCode;
		
	public UsedCouponDTO() {
	}

	public UsedCouponDTO(String email, String usedCode) {
		this.email = email;
		this.usedCode = usedCode;
	}
	
	public UsedCouponDTO(UsedCoupon entity) {
		email = entity.getEmail();
		usedCode = entity.getUsedCode();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsedCode() {
		return usedCode;
	}

	public void setUsedCode(String usedCode) {
		this.usedCode = usedCode;
	}
	
}
