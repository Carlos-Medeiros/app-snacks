package com.leo.snacks.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.domain.Order;
import com.leo.snacks.domain.OrderStatus;

public class OrderDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Integer code;
	private String address;
	private Double latitude;
	private Double longitude;
	private Double total;
	private Instant moment;
	private String details;
	private boolean paymantToCard;
	private boolean delivery;
	private OrderStatus status;

	private List<ProductDTO> products = new ArrayList<>();
	private List<DeliveryTaxDTO> deliveryTax = new ArrayList<>();
	
	public OrderDTO() {
	}
	
	public OrderDTO(Long id, Integer code, String address, Double latitude, Double longitude, Double total,
			String details, Instant moment, boolean paymantToCard, boolean delivery, OrderStatus status) {
		this.id = id;
		this.code = code;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.total = total;
		this.moment = moment;
		this.paymantToCard = paymantToCard;
		this.delivery = delivery;
		this.status = status;
	}
	
	public OrderDTO(Order entity) {
		id = entity.getId();
		code = entity.getCode();
		address = entity.getAddress();
		latitude = entity.getLatitude();
		longitude = entity.getLongitude();
		total = entity.getTotal();
		details = entity.getDetails();
		moment = entity.getMoment();
		paymantToCard = entity.isPaymantToCard();
		delivery = entity.isDelivery();
		status = entity.getStatus();
		products = entity.getProduct().stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
		deliveryTax = entity.getDeliveryTax().stream().map(x -> new DeliveryTaxDTO(x)).collect(Collectors.toList());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Instant getMoment() {
		return moment;
	}

	public void setMoment(Instant moment) {
		this.moment = moment;
	}

	public boolean isPaymantToCard() {
		return paymantToCard;
	}

	public void setPaymantToCard(boolean paymantToCard) {
		this.paymantToCard = paymantToCard;
	}

	public boolean isDelivery() {
		return delivery;
	}

	public void setDelivery(boolean delivery) {
		this.delivery = delivery;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public List<ProductDTO> getProducts() {
		return products;
	}

	public List<DeliveryTaxDTO> getDeliveryTax() {
		return deliveryTax;
	}

	public void setDeliveryTax(List<DeliveryTaxDTO> deliveryTax) {
		this.deliveryTax = deliveryTax;
	}

}
