package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.Account;
import com.leo.snacks.domain.DeliverymanStatus;

public class AccountDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String email;
	private String password;
	private String phones;
	private DeliverymanStatus status;
	
	public AccountDTO() {
	}

	public AccountDTO(Long id, String name, String email, String password, String phones, DeliverymanStatus status) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phones = phones;
		this.status = status;
	}
	
	public AccountDTO(Account entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		password = entity.getPassword();
		phones = entity.getPhones();
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhones() {
		return phones;
	}

	public void setPhones(String phones) {
		this.phones = phones;
	}

	public DeliverymanStatus getStatus() {
		return status;
	}

	public void setStatus(DeliverymanStatus status) {
		this.status = status;
	}
	
}
