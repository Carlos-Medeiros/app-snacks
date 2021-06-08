package com.leo.snacks.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_discount_coupon")
public class DiscountCoupon implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Size(min=6)
	private String code;
	private Double discountAmount;
	private Double minimunDiscountAmount;
	
	public DiscountCoupon() {
	}
	
	public DiscountCoupon(Long id, String code, Double discountAmount, Double minimunDiscountAmount) {
		this.id = id;
		this.code = code;
		this.discountAmount = discountAmount;
		this.minimunDiscountAmount = minimunDiscountAmount;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DiscountCoupon other = (DiscountCoupon) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}