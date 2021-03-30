package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.DeliverymanEmailValidation;

public class DeliverymanEmailValidationDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email;
	private String emailMaster;
	private Integer numberValidation;
		
	public DeliverymanEmailValidationDTO() {
	}

	public DeliverymanEmailValidationDTO(String email, String emailMaster, Integer numberValidation) {
		this.email = email;
		this.emailMaster = emailMaster;
		this.numberValidation = numberValidation;
	}
	
	public DeliverymanEmailValidationDTO(DeliverymanEmailValidation entity) {
		email = entity.getEmail();
		emailMaster = entity.getEmailMaster();
		numberValidation = entity.getNumberValidation();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmailMaster() {
		return emailMaster;
	}

	public void setEmailMaster(String emailMaster) {
		this.emailMaster = emailMaster;
	}

	public Integer getNumberValidation() {
		return numberValidation;
	}

	public void setNumberValidation(Integer numberValidation) {
		this.numberValidation = numberValidation;
	}
	
}
