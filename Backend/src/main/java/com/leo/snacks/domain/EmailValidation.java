package com.leo.snacks.domain;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table
public class EmailValidation implements Serializable {

	private static final long serialVersionUID = 1l;

	@Id
	@Email
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
		EmailValidation other = (EmailValidation) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}

}
