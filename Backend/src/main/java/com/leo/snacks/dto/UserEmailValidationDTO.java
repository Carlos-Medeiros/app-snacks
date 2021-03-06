package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.EmailValidation;

public class UserEmailValidationDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email;
	private Integer numberValidation;
		
	public UserEmailValidationDTO() {
	}

	public UserEmailValidationDTO(String email, Integer numberValidation) {
		this.email = email;
		this.numberValidation = numberValidation;
	}
	
	public UserEmailValidationDTO(EmailValidation entity) {
		email = entity.getEmail();
		numberValidation = entity.getNumberValidation();
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
