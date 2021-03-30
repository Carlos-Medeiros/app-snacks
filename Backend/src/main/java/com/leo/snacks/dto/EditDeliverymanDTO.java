package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.Deliveryman;

public class EditDeliverymanDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String email;
	private String password;
	private Long phones;
	
	public EditDeliverymanDTO() {
	}

	public EditDeliverymanDTO(Long id, String name, String email, String password, Long phones) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phones = phones;
	}
	
	public EditDeliverymanDTO(Deliveryman entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		password = entity.getPassword();
		phones = entity.getPhones();
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

	public Long getPhones() {
		return phones;
	}

	public void setPhones(Long phones) {
		this.phones = phones;
	}
	
}