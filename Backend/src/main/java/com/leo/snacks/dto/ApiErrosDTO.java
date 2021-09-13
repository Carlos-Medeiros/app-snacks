package com.leo.snacks.dto;

import java.util.Arrays;
import java.util.List;

public class ApiErrosDTO {

    private List<String> erros;

    public ApiErrosDTO() {
    }

    public ApiErrosDTO(String errorMessage) {
        this.erros = Arrays.asList(errorMessage);
    }

    public List<String> getErros() {
        return erros;
    }

    public void setErros(List<String> erros) {
        this.erros = erros;
    }
}
