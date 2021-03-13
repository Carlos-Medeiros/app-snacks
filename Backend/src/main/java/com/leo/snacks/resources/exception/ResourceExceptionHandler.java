package com.leo.snacks.resources.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.leo.snacks.services.exceptions.IntegrityConstraintViolationException;

public class ResourceExceptionHandler {

	@ExceptionHandler(IntegrityConstraintViolationException.class)
	public ResponseEntity<StandardError> dataIntegrity(IntegrityConstraintViolationException e, HttpServletRequest request) {
		StandardError error = new StandardError(HttpStatus.BAD_REQUEST.value(), e.getMessage(), System.currentTimeMillis());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		
	}
}
