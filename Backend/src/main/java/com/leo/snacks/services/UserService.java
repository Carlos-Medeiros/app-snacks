package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.User;
import com.leo.snacks.dto.EditUserDTO;
import com.leo.snacks.dto.UserDTO;
import com.leo.snacks.dto.UserValidationDTO;
import com.leo.snacks.repositories.UserRepository;
import com.leo.snacks.services.exceptions.IntegrityConstraintViolationException;
import com.leo.snacks.util.Util;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll() {
		List<User> list = repository.findAll();
		return list.stream().map(x -> new UserDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public UserDTO search(Long id) {
		User user = repository.getOne(id);
		return new UserDTO(user);
	}
	
	@Transactional
	public UserValidationDTO emailValidator(UserValidationDTO dto) {
		User user = new User(null, null, dto.getEmail(), null, null, dto.getNumberValidation());
		if (repository.findByEmailEquals(dto.getEmail()) == null) {
			return new UserValidationDTO(user);
		}
		return new UserValidationDTO(null);
	}
	
	@Transactional
	public EditUserDTO register(EditUserDTO dto) {
		User user = new User(null, dto.getName(), dto.getEmail(), Util.md5(dto.getPassword()), dto.getPhones(), null);	
		user = repository.save(user);
		return new EditUserDTO(user);
	}
	
	@Transactional
	public EditUserDTO login(EditUserDTO dto, HttpSession session) {
		User user = this.repository.findByEmailAndPassword(dto.getEmail(), Util.md5(dto.getPassword()));
		if (user != null) {
			session.setAttribute("UsuarioLogado", user);
			return new EditUserDTO(user);
		}
		else {
			return new EditUserDTO(null);
		}
	}
	
	@Transactional
	public void delete(Long id) {
		search(id);
		try {
			repository.deleteById(id);
		}
		catch (DataIntegrityViolationException e ) {
			throw new IntegrityConstraintViolationException("Não é possivel excluir uma categoria que tem produtos");
		}
	}
	
}
