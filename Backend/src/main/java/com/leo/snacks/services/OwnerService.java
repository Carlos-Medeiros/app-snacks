package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Owner;
import com.leo.snacks.dto.OwnerDTO;
import com.leo.snacks.repositories.OwnerRepository;
import com.leo.snacks.util.Util;

@Service
public class OwnerService {

	@Autowired
	private OwnerRepository repository;
	
	@Transactional
	public OwnerDTO login(OwnerDTO dto) {
		Owner owner = this.repository.findByEmailAndPassword(dto.getEmail(), Util.md5(dto.getPassword()));
		if (owner != null) {
			return new OwnerDTO(owner);
		}
		else {
			return new OwnerDTO(null);
		}
	}
}
