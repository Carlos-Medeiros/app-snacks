package com.leo.snacks.exception;

public class invalidPasswordException  extends RuntimeException{
    public invalidPasswordException() {
        super("Invalid password");
    }
}
