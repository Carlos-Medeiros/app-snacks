package com.leo.snacks.services;

import com.leo.snacks.domain.Account;
import com.leo.snacks.dto.AccountDTO;
import com.leo.snacks.exception.BusinessRuleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.EmailValidation;
import com.leo.snacks.dto.UserEmailValidationDTO;
import com.leo.snacks.repositories.AccountRepository;
import com.leo.snacks.repositories.EmailValidationRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    
	@Autowired
	private EmailValidationRepository emailValidationRepository;
	
	@Autowired
	private AccountRepository accountRepository;
	
    public void sendValidation(String to, String body, String topic) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("josecarlosdemedeirosfilho@gmail.com");
        message.setTo(to); 
        message.setSubject(body); 
        message.setText(topic);
        emailSender.send(message);
    }
	
	@Transactional(readOnly = true)
	public UserEmailValidationDTO searchEmail(String email) {
		EmailValidation emailValidation = emailValidationRepository.findByEmail(email);
		return new UserEmailValidationDTO(emailValidation);
	}
	
	@Transactional
	public UserEmailValidationDTO keyValidation(UserEmailValidationDTO dto) {
		EmailValidation emailValidation = this.emailValidationRepository.findByEmailAndNumberValidation(dto.getEmail(), dto.getNumberValidation());
		if (emailValidation != null) {
			return new UserEmailValidationDTO(emailValidation);
		}
		else {
			throw new BusinessRuleException("Invalid code");
		}
	}
    
	@Transactional
	public UserEmailValidationDTO emailValidator(UserEmailValidationDTO dto) {
		Integer numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		}
		
		EmailValidation emailValidation = new EmailValidation(dto.getEmail(), numberRandom);
		if (emailValidationRepository.findByEmail(dto.getEmail()) == null) {
			emailValidation = emailValidationRepository.save(emailValidation);
			return new UserEmailValidationDTO(emailValidationRepository.findByEmail(dto.getEmail()));
		}
		else {
			throw new BusinessRuleException("E-mail already registered");
		}
	}
	
	@Transactional
	public UserEmailValidationDTO emailExisting(UserEmailValidationDTO dto) {		
		if (emailValidationRepository.findByEmail(dto.getEmail()) != null 
			&& accountRepository.findByEmail(dto.getEmail()) != null) {
			return new UserEmailValidationDTO(emailValidationRepository.findByEmail(dto.getEmail()));
		}
		else {
			throw new BusinessRuleException("E-mail not registered");
		}
	}
	
	@Transactional
	public UserEmailValidationDTO update(String email, Integer numberKey) {
		Integer numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		}

		EmailValidation emailValidation = emailValidationRepository.findByEmail(email);
		switch (numberKey) {
		case 0:
			if (accountRepository.findByEmail(email) == null) {
				emailValidation.setNumberValidation(numberRandom);
				emailValidation = emailValidationRepository.save(emailValidation);
				return new UserEmailValidationDTO(emailValidationRepository.findByEmail(email));
			}
			else {
				throw new BusinessRuleException("E-mail already registered");
			}
		case 1:
			if (accountRepository.findByEmail(email) != null) {
				emailValidation.setNumberValidation(numberRandom);
				emailValidation = emailValidationRepository.save(emailValidation);
				return new UserEmailValidationDTO(emailValidationRepository.findByEmail(email));
			}
			else {
				throw new BusinessRuleException("E-mail not registered");
			}
		default:
			throw new BusinessRuleException("Wrong key number");
		}
	}
	
	@Transactional
	public void delete(String email) {
		emailValidationRepository.deleteById(email);
	}
}