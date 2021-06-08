package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.DeliveryTax;

public class DeliveryTaxDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Double deliveryTax;
	
	
	public DeliveryTaxDTO() {
	}

	public DeliveryTaxDTO(Long id, Double deliveryTax) {
		this.id = id;
		this.deliveryTax = deliveryTax;
	}
	
	public DeliveryTaxDTO(DeliveryTax entity) {
		id = entity.getId();
		deliveryTax = entity.getDeliveryTax();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getDeliveryTax() {
		return deliveryTax;
	}

	public void setDeliveryTax(Double deliveryTax) {
		this.deliveryTax = deliveryTax;
	}
}
