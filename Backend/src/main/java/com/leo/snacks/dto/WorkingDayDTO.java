package com.leo.snacks.dto;

import java.io.Serializable;

import com.leo.snacks.domain.WorkingDay;

public class WorkingDayDTO implements Serializable {

	private static final long serialVersionUID = 1l;
	
	private Long id;
	private String name;
	private Integer openingTime;
	private Integer closingTime;
	private boolean isOpen;
	
	public WorkingDayDTO() {
	}

	public WorkingDayDTO(Long id, String name, Integer openingTime, Integer closingTime, boolean isOpen) {
		this.id = id;
		this.name = name;
		this.openingTime = openingTime;
		this.closingTime = closingTime;
		this.isOpen = isOpen;
	}

	public WorkingDayDTO(WorkingDay entity) {
		id = entity.getId();
		name = entity.getName();
		openingTime = entity.getOpeningTime();
		closingTime = entity.getClosingTime();
		isOpen = entity.isOpen();
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
	
}
