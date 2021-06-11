package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Product;
import com.leo.snacks.domain.User;
import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.dto.UserDTO;
import com.leo.snacks.repositories.ProductRepository;
import com.leo.snacks.repositories.UserRepository;
import com.leo.snacks.util.Util;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Transactional
	public EditUserDTO register(EditUserDTO dto) {
		User user = new User(null, dto.getName(), dto.getEmail(), Util.md5(dto.getPassword()), dto.getPhones());	
		if (repository.findByEmailEquals(dto.getEmail()) == null) {
			user = repository.save(user);
			return new EditUserDTO(user);

		}
		return new EditUserDTO(null);
	}
	
	@Transactional
	public EditUserDTO login(EditUserDTO dto) {
		User user = this.repository.findByEmailAndPassword(dto.getEmail(), Util.md5(dto.getPassword()));
		if (user != null) {
			return new EditUserDTO(user);
		}
		else {
			return new EditUserDTO(null);
		}
	}
	
	@Transactional
	public EditUserDTO editName(EditUserDTO dto, String email) {
		User user = repository.findByEmail(email);
		user.setName(dto.getName());
		user = repository.save(user);
		return new EditUserDTO(user);
	}
	
	@Transactional
	public EditUserDTO editPhoneNumber(EditUserDTO dto, String email) {
		User user = repository.findByEmail(email);
		user.setPhones(dto.getPhones());
		user = repository.save(user);
		return new EditUserDTO(user);
	}
	
	@Transactional
	public EditUserDTO editPassword(EditUserDTO dto, String email) {
		User user = repository.findByEmail(email);
		user.setPassword(Util.md5(dto.getPassword()));
		user = repository.save(user);
		return new EditUserDTO(user);
	}
	
	@Transactional(readOnly = true)
	public UserDTO favoriteProducts(String email) {
		User user = repository.findByEmail(email);
		return new UserDTO(user);
	}	
	
	@Transactional
	public UserDTO favoriteProductsInsert(String email, Long id) {
		User user = repository.findByEmail(email);
		Product product = productRepository.getOne(id);
		user.getProduct().add(product);
		user = repository.save(user);
		return new UserDTO(user);
	}
	
	@Transactional
	public UserDTO favoriteProductsRemove(String email, Long id) {
		User user = repository.findByEmail(email);
		Product product = productRepository.getOne(id);
		user.getProduct().remove(product);
		user = repository.save(user);
		return new UserDTO(user);
	}
	
	@Transactional
	public void delete(String email) {
		User user = repository.findByEmail(email);
		repository.deleteById(user.getId());
	}
	
}
