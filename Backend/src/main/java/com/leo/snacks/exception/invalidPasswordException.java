package com.leo.snacks.exception;

public class invalidPasswordException  extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public invalidPasswordException() {
        super("Invalid password");
    }
}
