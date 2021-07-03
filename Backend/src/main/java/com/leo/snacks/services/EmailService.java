package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.EmailValidation;
import com.leo.snacks.dto.UserEmailValidationDTO;
import com.leo.snacks.repositories.DeliverymanRepository;
import com.leo.snacks.repositories.EmailValidationRepository;
import com.leo.snacks.repositories.OwnerRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    
	@Autowired
	private EmailValidationRepository emailValidationRepository;
	
	@Autowired
	private DeliverymanRepository deliverymanRepository;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
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
		EmailValidation emailValidation = this.emailValidationRepository.findByEmailAndNumberValidation(dto.getEmail(), dto.getNumberValidation());;
		if (emailValidation != null) {
			return new UserEmailValidationDTO(emailValidation);
		}
		else {
			return new UserEmailValidationDTO(null);
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
			return new UserEmailValidationDTO(null);
		}
	}
	
	@Transactional
	public UserEmailValidationDTO emailExisting(UserEmailValidationDTO dto) {		
		if (emailValidationRepository.findByEmail(dto.getEmail()) != null 
			|| deliverymanRepository.findByEmail(dto.getEmail()) != null 
			|| ownerRepository.findByEmail(dto.getEmail()) != null) {
			return new UserEmailValidationDTO(emailValidationRepository.findByEmail(dto.getEmail()));
		}
		else {
			return new UserEmailValidationDTO(null);
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
			if (deliverymanRepository.findByEmail(email) == null && ownerRepository.findByEmail(email) == null) {
				emailValidation.setNumberValidation(numberRandom);
				emailValidation = emailValidationRepository.save(emailValidation);
				return new UserEmailValidationDTO(emailValidationRepository.findByEmail(email));
			}
			else {
				return new UserEmailValidationDTO(null);
			}
		case 1:
			if (deliverymanRepository.findByEmail(email) != null || ownerRepository.findByEmail(email) != null) {
				emailValidation.setNumberValidation(numberRandom);
				emailValidation = emailValidationRepository.save(emailValidation);
				return new UserEmailValidationDTO(emailValidationRepository.findByEmail(email));
			}
			else {
				return new UserEmailValidationDTO(null);
			}
		default:
			return new UserEmailValidationDTO(null);
		}
	}
	
	@Transactional
	public void delete(String email) {
		emailValidationRepository.deleteById(email);
	}
}