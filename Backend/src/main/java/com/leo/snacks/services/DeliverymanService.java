package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Deliveryman;
import com.leo.snacks.domain.DeliverymanStatus;
import com.leo.snacks.dto.EditDeliverymanDTO;
import com.leo.snacks.repositories.DeliverymanRepository;
import com.leo.snacks.util.Util;

@Service
public class DeliverymanService {

	@Autowired
	private DeliverymanRepository repository;
	
	@Transactional(readOnly = true)
	public List<EditDeliverymanDTO> findAll() {
		List<Deliveryman> list = repository.findAll();
		return list.stream().map(x -> new EditDeliverymanDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public EditDeliverymanDTO search(String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO register(EditDeliverymanDTO dto) {
		Deliveryman deliveryman = new Deliveryman(null, dto.getName(), dto.getEmail(), Util.md5(dto.getPassword()), dto.getPhones(), DeliverymanStatus.PENDING);	
		if (repository.findByEmailEquals(dto.getEmail()) == null) {
			deliveryman = repository.save(deliveryman);
			return new EditDeliverymanDTO(deliveryman);
		}
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO login(EditDeliverymanDTO dto) {
		Deliveryman deliveryman = this.repository.findByEmailAndPassword(dto.getEmail(), Util.md5(dto.getPassword()));
		if (deliveryman != null) {
			return new EditDeliverymanDTO(deliveryman);
		}
		else {
			return new EditDeliverymanDTO(null);
		}
	}
	
	@Transactional
	public EditDeliverymanDTO forgotYourPassword(EditDeliverymanDTO dto, String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setPassword(Util.md5(dto.getPassword()));
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO editName(EditDeliverymanDTO dto, String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setName(dto.getName());
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO editPhoneNumber(EditDeliverymanDTO dto, String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setPhones(dto.getPhones());
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO editPassword(EditDeliverymanDTO dto, String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setPassword(Util.md5(dto.getPassword()));
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public void delete(String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		repository.deleteById(deliveryman.getId());
	}
	
	@Transactional
	public EditDeliverymanDTO updateAccepted(String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setStatus(DeliverymanStatus.ACCEPTED);
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO updateRejected(String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setStatus(DeliverymanStatus.REJECTED);
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
	
	@Transactional
	public EditDeliverymanDTO updateDisabled(String email) {
		Deliveryman deliveryman = repository.findByEmail(email);
		deliveryman.setStatus(DeliverymanStatus.DISABLED);
		deliveryman = repository.save(deliveryman);
		return new EditDeliverymanDTO(deliveryman);
	}
}
