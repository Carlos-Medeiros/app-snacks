package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.DeliveryTax;

public interface DeliveryTaxRepository extends JpaRepository<DeliveryTax, Long> {

}
