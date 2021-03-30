package com.leo.snacks.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_delivaryman_email_validation")
public class DeliverymanEmailValidation implements Serializable {

	private static final long serialVersionUID = 1l;
	
	@Id
	private String email;
	private String emailMaster;
	private Integer numberValidation;
		
	public DeliverymanEmailValidation() {
	}

	public DeliverymanEmailValidation(String email, String emailMaster, Integer numberValidation) {
		this.email = email;
		this.emailMaster = emailMaster;
		this.numberValidation = numberValidation;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
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
		DeliverymanEmailValidation other = (DeliverymanEmailValidation) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}
	
	
	
}
