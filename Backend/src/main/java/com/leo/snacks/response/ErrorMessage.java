package com.leo.snacks.response;

import java.io.Serializable;
import java.time.LocalDateTime;

public class ErrorMessage implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private LocalDateTime dataHora;
	private String message;
	
	public ErrorMessage() {
	}

	public ErrorMessage(LocalDateTime dataHora, String message) {
		this.dataHora = dataHora;
		this.message = message;
	}

	public LocalDateTime getDataHora() {
		return dataHora;
	}

	public void setDataHora(LocalDateTime dataHora) {
		this.dataHora = dataHora;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
