package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.Product;

public class ProductDTO implements Serializable {

	private static final long serialVersionUID = 1l;
	
	private Long id;
	private String name;
	private Double price;
	private String description;
	private String imageUri;
	private boolean inventory;
	private boolean discount;
	private Double percentageDiscount;
	
	public ProductDTO() {
	}

	public ProductDTO(Long id, String name, Double price, String description, String imageUri, boolean inventory, boolean discount, Double percentageDiscount) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.imageUri = imageUri;
		this.inventory = inventory;
		this.discount = discount;
		this.percentageDiscount = percentageDiscount;
	}
	
	public ProductDTO(Product entity) {
		id = entity.getId();
		name = entity.getName();
		price = entity.getPrice();
		description = entity.getDescription();
		imageUri = entity.getImageUri();
		inventory = entity.isInventory();
		discount = entity.isDiscount();
		percentageDiscount = entity.getPercentageDiscount();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUri() {
		return imageUri;
	}

	public void setImageUri(String imageUri) {
		this.imageUri = imageUri;
	}

	public boolean isInventory() {
		return inventory;
	}

	public void setInventory(boolean inventory) {
		this.inventory = inventory;
	}

	public boolean isDiscount() {
		return discount;
	}

	public void setDiscount(boolean discount) {
		this.discount = discount;
	}

	public Double getPercentageDiscount() {
		return percentageDiscount;
	}

	public void setPercentageDiscount(Double percentageDiscount) {
		this.percentageDiscount = percentageDiscount;
	}
	
}
