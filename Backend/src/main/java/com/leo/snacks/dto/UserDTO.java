package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String phones;
	
	
	public UserDTO() {
	}

	public UserDTO(Long id, String name, String phones) {
		this.id = id;
		this.name = name;
		this.phones = phones;
	}
	
	public UserDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
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

	public String getPhones() {
		return phones;
	}

	public void setPhones(String phones) {
		this.phones = phones;
	}
	

}