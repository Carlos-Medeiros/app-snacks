package com.leo.snacks.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.domain.Order;
import com.leo.snacks.domain.OrderStatus;
import com.leo.snacks.domain.OrderStatusClient;

public class OrderDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String address;
	private Double latitude;
	private Double longitude;
	private Double total;
	private Instant moment;
	private boolean paymantToCard;
	private boolean delivery;
	private boolean coupon;
	private OrderStatus status;
	private OrderStatusClient statusClient;

	private List<ProductDTO> products = new ArrayList<>();
	private List<UserDTO> users = new ArrayList<>();
	private List<DiscountCouponDTO> discountCoupon = new ArrayList<>();
	private List<DeliveryTaxDTO> deliveryTax = new ArrayList<>();
	
	public OrderDTO() {
	}
	
	public OrderDTO(Long id, String address, Double latitude, Double longitude, Double total,
			Instant moment, boolean paymantToCard, boolean delivery, boolean coupon, OrderStatus status, OrderStatusClient statusClient) {
		this.id = id;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.total = total;
		this.moment = moment;
		this.paymantToCard = paymantToCard;
		this.delivery = delivery;
		this.coupon = coupon;
		this.status = status;
		this.statusClient = statusClient;
	}
	
	public OrderDTO(Order entity) {
		id = entity.getId();
		address = entity.getAddress();
		latitude = entity.getLatitude();
		longitude = entity.getLongitude();
		total = entity.getTotal();
		moment = entity.getMoment();
		paymantToCard = entity.isPaymantToCard();
		delivery = entity.isDelivery();
		coupon = entity.isCoupon();
		status = entity.getStatus();
		users = entity.getUser().stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
		products = entity.getProduct().stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
		discountCoupon = entity.getDiscountCoupon().stream().map(x -> new DiscountCouponDTO(x)).collect(Collectors.toList());
		deliveryTax = entity.getDeliveryTax().stream().map(x -> new DeliveryTaxDTO(x)).collect(Collectors.toList());
		statusClient = entity.getStatusClient();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public boolean isCoupon() {
		return coupon;
	}

	public void setCoupon(boolean coupon) {
		this.coupon = coupon;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public OrderStatusClient getStatusClient() {
		return statusClient;
	}

	public void setStatusClient(OrderStatusClient statusClient) {
		this.statusClient = statusClient;
	}

	public List<UserDTO> getUsers() {
		return users;
	}

	public List<ProductDTO> getProducts() {
		return products;
	}

	public List<DiscountCouponDTO> getDiscountCoupon() {
		return discountCoupon;
	}

	public void setDiscountCoupon(List<DiscountCouponDTO> discountCoupon) {
		this.discountCoupon = discountCoupon;
	}

	public List<DeliveryTaxDTO> getDeliveryTax() {
		return deliveryTax;
	}

	public void setDeliveryTax(List<DeliveryTaxDTO> deliveryTax) {
		this.deliveryTax = deliveryTax;
	}

}
