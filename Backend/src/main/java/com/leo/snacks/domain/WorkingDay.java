package com.leo.snacks.domain;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table
public class WorkingDay implements Serializable {

	private static final long serialVersionUID = 1l;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private String name;
	private Integer openingTime;
	private Integer closingTime;
	private boolean isOpen;
	
	public WorkingDay() {
	}

	public WorkingDay(Long id, @NotBlank String name, Integer openingTime, Integer closingTime, boolean isOpen) {
		this.id = id;
		this.name = name;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
		this.isOpen = isOpen;
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

	public Integer getOpeningTime() {
		return openingTime;
	}

	public void setOpeningTime(Integer openingTime) {
		this.openingTime = openingTime;
	}

	public Integer getClosingTime() {
		return closingTime;
	}

	public void setClosingTime(Integer closingTime) {
		this.closingTime = closingTime;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		WorkingDay other = (WorkingDay) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
