package com.leo.snacks.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_order")
public class Order implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private String clientEmail;
	@NotBlank
	private String address;
	@NotNull
	private Double latitude;
	@NotNull
	private Double longitude;
	private Instant moment;
	private boolean paymantToCard;
	private boolean delivery;
	private boolean coupon;
	private OrderStatus status;
	private OrderStatusClient statusClient;
	
	@ManyToMany
	@JoinTable(name = "tb_order_user",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> user = new HashSet<>();
	
	
	@ManyToMany
	@JoinTable(name = "tb_order_product",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "product_id"))
	private List<Product> product = new ArrayList<>();
	
	@ManyToMany
	@JoinTable(name = "tb_order_discount_coupon",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "discount_coupon_id"))
	private Set<DiscountCoupon> discountCoupon = new HashSet<>();
	
	@ManyToMany
	@JoinTable(name = "tb_order_delivery_tax",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "delivery_tax_id"))
	private Set<DeliveryTax> deliveryTax = new HashSet<>();
	
	public Order() {
	}
	
	public Order(Long id, String clientEmail, String address, Double latitude, Double longitude,
			Instant moment, boolean paymantToCard, boolean delivery, boolean coupon, OrderStatus status, OrderStatusClient statusClient) {
		this.id = id;
		this.clientEmail = clientEmail;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.moment = moment;
		this.paymantToCard = paymantToCard;
		this.delivery = delivery;
		this.coupon = coupon;
		this.status = status;
		this.statusClient = statusClient;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
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

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Set<User> getUser() {
		return user;
	}

	public void setUser(Set<User> user) {
		this.user = user;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public Set<DiscountCoupon> getDiscountCoupon() {
		return discountCoupon;
	}

	public void setDiscountCoupon(Set<DiscountCoupon> discountCoupon) {
		this.discountCoupon = discountCoupon;
	}

	public Set<DeliveryTax> getDeliveryTax() {
		return deliveryTax;
	}

	public void setDeliveryTax(Set<DeliveryTax> deliveryTax) {
		this.deliveryTax = deliveryTax;
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
	
	public OrderStatusClient getStatusClient() {
		return statusClient;
	}

	public void setStatusClient(OrderStatusClient statusClient) {
		this.statusClient = statusClient;
	}

	public Double getTotal() {
		double sum = 0.0;
		for (Product p : product) {
			sum += p.getPrice();
		}
		for (DiscountCoupon d : discountCoupon) {
			if (d.getMinimunDiscountAmount() <= sum) {
				sum -= d.getDiscountAmount();
			}
			else {
				this.setCoupon(false);
				sum += 0.0;
			}
		}
		if (this.isDelivery() == true) {
			for (DeliveryTax dt : deliveryTax) {
				sum += dt.getDeliveryTax();
			}
		}
		else {
			sum += 0.0;
		}
		return sum;
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
		Order other = (Order) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
