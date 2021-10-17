package com.leo.snacks.services;

import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.dto.AccountDeliverymanDTO;
import com.leo.snacks.dto.CredentialsDTO;
import com.leo.snacks.exception.BusinessRuleException;
import com.leo.snacks.exception.invalidPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Account;
import com.leo.snacks.domain.DeliverymanStatus;
import com.leo.snacks.dto.AccountDTO;
import com.leo.snacks.repositories.AccountRepository;

@Service
public class AccountService implements UserDetailsService {

	@Autowired
	private AccountRepository repository;

	@Autowired
	private PasswordEncoder encoder;
	
	@Transactional(readOnly = true)
	public List<AccountDeliverymanDTO> findAll() {
		List<Account> list = repository.findAll();
		return list.stream().map(x -> new AccountDeliverymanDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public AccountDTO search(String email) {
		Account account = repository.findByEmail(email);
		return new AccountDTO(account);
	}

 	@Transactional
	public AccountDTO register(AccountDTO dto) {
        String passwordEncoder = encoder.encode(dto.getPassword());
		Account account = new Account(null, dto.getName(), dto.getEmail(), passwordEncoder, dto.getPhones(), false, DeliverymanStatus.PENDING);
        if (repository.findByEmail(dto.getEmail()) == null) {
            account = repository.save(account);
            return new AccountDTO(account);
        } else {
            throw new BusinessRuleException("The email "+ dto.getEmail() +" is already registered ");
        }
	}

	@Transactional
	public void forgotYourPassword(AccountDTO dto, String email) {
		Account user = repository.findByEmail(email);
		String passwordEncoder = encoder.encode(dto.getPassword());
		repository
				.findById(user.getId())
				.map( account -> {
					account.setPassword(passwordEncoder);
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	@Transactional
	public void editName(AccountDTO dto, String email) {
		Account user = repository.findByEmail(email);
		repository
				.findById(user.getId())
				.map( account -> {
					account.setName(dto.getName());
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	@Transactional
	public void editPhoneNumber(AccountDTO dto, String email) {
		Account user = repository.findByEmail(email);
		repository
				.findById(user.getId())
				.map( account -> {
					account.setPhones(dto.getPhones());
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	@Transactional
	public void editPassword(AccountDTO dto, String email) {
		Account user = repository.findByEmail(email);
		String passwordEncoder = encoder.encode(dto.getPassword());
		repository
				.findById(user.getId())
				.map( account -> {
					account.setPassword(passwordEncoder);
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	@Transactional
	public void editAdmin(Long id) {
		repository
				.findById(id)
				.map( account -> {
					if (account.isAdmin()) {
						account.setAdmin(false);
					} else {
						account.setAdmin(true);
					}
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	@Transactional
	public void delete(String email) {
		Account user = repository.findByEmail(email);
		repository.deleteById(user.getId());
	}
	
	@Transactional
	public void updateAccepted(Long id) {
		repository
				.findById(id)
				.map( account -> {
					account.setStatus(DeliverymanStatus.ACCEPTED);
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}
	
	@Transactional
	public void updateRejected(Long id) {
		repository
				.findById(id)
				.map( account -> {
					account.setStatus(DeliverymanStatus.REJECTED);
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}
	
	@Transactional
	public void updateDisabled(Long id) {
		repository
				.findById(id)
				.map( account -> {
					account.setStatus(DeliverymanStatus.DISABLED);
					return repository.save(account);
				}).orElseThrow(() -> new BusinessRuleException("User not found"));
	}

	public UserDetails authenticate(CredentialsDTO dto) {
		UserDetails user = loadUserByUsername(dto.getEmail());
		boolean validPassword = encoder.matches(dto.getPassword(), user.getPassword());

		if(validPassword) {
			return user;
		}

		throw new invalidPasswordException();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = repository.findByEmail(username);

		String[] roles = account.isAdmin() ?
				new String[]{"ADMIN", "DELIVERYMAN"} : new String[]{"DELIVERYMAN"};

		return User
				.builder()
				.username(account.getEmail())
				.password(account.getPassword())
				.roles(roles)
				.build();
	}

}
