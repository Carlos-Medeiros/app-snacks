package com.leo.snacks.services.exceptions;

public class IntegrityConstraintViolationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public IntegrityConstraintViolationException(String msg) {
		super(msg);
	}
	
	public IntegrityConstraintViolationException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
