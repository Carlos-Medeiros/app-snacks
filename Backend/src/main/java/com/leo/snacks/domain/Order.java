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
@Table(name = "request")
public class Order implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private Integer code;
	@NotBlank
	private String address;
	@NotNull
	private Double latitude;
	@NotNull
	private Double longitude;
	@NotBlank
	private String details;
	private Instant moment;
	private boolean paymantToCard;
	private Double change;
	private boolean delivery;
	private OrderStatus status;
	
	@ManyToMany
	@JoinTable(name = "request_product",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "product_id"))
	private List<Product> product = new ArrayList<>();
	
	@ManyToMany
	@JoinTable(name = "request_delivery_tax",
			joinColumns = @JoinColumn(name = "order_id"),
			inverseJoinColumns = @JoinColumn(name = "delivery_tax_id"))
	private Set<DeliveryTax> deliveryTax = new HashSet<>();
	
	public Order() {
	}
	
	public Order(Long id, Integer code, String address, Double latitude, Double longitude,
			String details,Instant moment, boolean paymantToCard, Double change, boolean delivery, OrderStatus status) {
		this.id = id;
		this.code = code;
		this.address = address;
		this.latitude = latitude;
		this.longitude = longitude;
		this.details = details;
		this.moment = moment;
		this.paymantToCard = paymantToCard;
		this.change = change;
		this.delivery = delivery;
		this.status = status;
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

	public Double getChange() {
		return change;
	}

	public void setChange(Double change) {
		this.change = change;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public List<Product> getProduct() {
		return product;
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

	public Double getTotal() {
		double sum = 0.0;
		for (Product p : product) {
			sum += p.getPrice();
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
