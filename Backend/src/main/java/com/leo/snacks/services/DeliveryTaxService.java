package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.exception.BusinessRuleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.DeliveryTax;
import com.leo.snacks.dto.DeliveryTaxDTO;
import com.leo.snacks.repositories.DeliveryTaxRepository;

@Service
public class DeliveryTaxService {

	@Autowired
	private DeliveryTaxRepository repository;
	
	@Transactional(readOnly = true)
	public List<DeliveryTaxDTO> findAll() {
		List<DeliveryTax> list = repository.findAll();
		return list.stream().map(x -> new DeliveryTaxDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public DeliveryTaxDTO search(Long id) {
		DeliveryTax deliveryTax = repository.getOne(id);
		return new DeliveryTaxDTO(deliveryTax);
	}
	
	@Transactional
	public DeliveryTaxDTO insert(DeliveryTaxDTO dto) {
		DeliveryTax deliveryTax = new DeliveryTax(null, dto.getDeliveryTax());
		if(dto.getDeliveryTax() == null) {
			throw new BusinessRuleException("The delivery fee cannot be zero");
		} else {
			deliveryTax = repository.save(deliveryTax);
			return new DeliveryTaxDTO(deliveryTax);
		}
	}
	
	@Transactional
	public DeliveryTaxDTO update(DeliveryTaxDTO dto) {
		search(dto.getId());
		DeliveryTax deliveryTax = new DeliveryTax(dto.getId(), dto.getDeliveryTax());
		if(dto.getDeliveryTax() == null) {
			throw new BusinessRuleException("The delivery fee cannot be zero");
		} else {
			deliveryTax = repository.save(deliveryTax);
			return new DeliveryTaxDTO(deliveryTax);
		}
	}
	
	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}
	
}
