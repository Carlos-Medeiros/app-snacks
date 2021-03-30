package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Deliveryman;
import com.leo.snacks.dto.EditDeliverymanDTO;
import com.leo.snacks.repositories.DeliverymanRepository;
import com.leo.snacks.util.Util;

@Service
public class DeliverymanService {

	@Autowired
	private DeliverymanRepository repository;
	
	@Transactional
	public EditDeliverymanDTO register(EditDeliverymanDTO dto) {
		Deliveryman deliveryman = new Deliveryman(null, dto.getName(), dto.getEmail(), Util.md5(dto.getPassword()), dto.getPhones());	
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
			return new EditDeliverymanDTO(deliveryman);
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
	
}
