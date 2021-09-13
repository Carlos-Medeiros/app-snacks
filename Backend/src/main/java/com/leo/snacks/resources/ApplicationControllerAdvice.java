package com.leo.snacks.resources;

import com.leo.snacks.dto.ApiErrosDTO;
import com.leo.snacks.exception.BusinessRuleException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationControllerAdvice {

    @ExceptionHandler(BusinessRuleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrosDTO handleBusinessRuleException(BusinessRuleException ex) {
        String errorMsg = ex.getMessage();
        return new ApiErrosDTO(errorMsg);
    }
}
