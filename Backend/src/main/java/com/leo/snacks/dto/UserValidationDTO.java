package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.User;

public class UserValidationDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String email;
	private Integer numberValidation;	
	
	public UserValidationDTO() {
	}

	public UserValidationDTO(Long id, String email, Integer numberValidation) {
		this.id = id;
		this.email = email;
		this.numberValidation = numberValidation;
	}
	
	public UserValidationDTO(User entity) {
		id = entity.getId();
		email = entity.getEmail();
		numberValidation = entity.getNumberValidation();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getNumberValidation() {
		return numberValidation;
	}

	public void setNumberValidation(Integer numberValidation) {
		this.numberValidation = numberValidation;
	}

}
