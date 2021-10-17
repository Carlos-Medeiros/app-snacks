package com.leo.snacks.dto;

import com.leo.snacks.domain.Account;
import com.leo.snacks.domain.DeliverymanStatus;

import java.io.Serializable;

public class AccountDeliverymanDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String email;
	private String phones;
	private boolean admin;
	private DeliverymanStatus status;

	public AccountDeliverymanDTO() {
	}

	public AccountDeliverymanDTO(Long id, String name, String email, String password, String phones, boolean admin, DeliverymanStatus status) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phones = phones;
		this.admin = admin;
		this.status = status;
	}

	public AccountDeliverymanDTO(Account entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		phones = entity.getPhones();
		admin = entity.isAdmin();
		status = entity.getStatus();
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
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhones() {
		return phones;
	}

	public void setPhones(String phones) {
		this.phones = phones;
	}

	public boolean isAdmin() { return admin; }

	public void setAdmin(boolean admin) { this.admin = admin; }

	public DeliverymanStatus getStatus() {
		return status;
	}

	public void setStatus(DeliverymanStatus status) {
		this.status = status;
	}
	
}
