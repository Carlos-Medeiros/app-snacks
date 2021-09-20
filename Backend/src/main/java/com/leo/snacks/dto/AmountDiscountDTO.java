package com.leo.snacks.dto;

public class AmountDiscountDTO {

    private Double amount;

    public AmountDiscountDTO() {
    }

    public AmountDiscountDTO(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
