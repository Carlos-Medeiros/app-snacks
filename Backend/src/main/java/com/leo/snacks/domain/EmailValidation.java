package com.leo.snacks.domain;

import java.io.Serializable;

public class EmailValidation implements Serializable {

	private static final long serialVersionUID = 1l;
	
	private String email;
	private Integer numberValidation;

	
	public EmailValidation() {
	}

	public EmailValidation(String email, Integer numberValidation) {
		this.email = email;
		this.numberValidation = numberValidation;
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
