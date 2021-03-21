package com.leo.snacks.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.EmailValidation;
import com.leo.snacks.dto.UserEmailValidationDTO;
import com.leo.snacks.repositories.EmailValidationRepository;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    
	@Autowired
	private EmailValidationRepository emailValidationRepository;
    
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
	public UserEmailValidationDTO emailValidator(UserEmailValidationDTO dto) {
		Random random = new Random();
		Integer numberRandom = random.nextInt(999999 - 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = random.nextInt(1000000 - 100000);
		}
		EmailValidation emailValidation = new EmailValidation(dto.getEmail(), numberRandom);
		if (emailValidationRepository.findByEmailEquals(dto.getEmail()) == null) {
			emailValidation = emailValidationRepository.save(emailValidation);
			return new UserEmailValidationDTO(emailValidation);
		}
		return new UserEmailValidationDTO(null);
	}
	
	@Transactional
	public UserEmailValidationDTO update(String email) {
		Random random = new Random();
		Integer numberRandom = random.nextInt(999999 - 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = random.nextInt(1000000 - 100000);
		}
		EmailValidation emailValidation = emailValidationRepository.getOne(email);
		emailValidation.setNumberValidation(numberRandom);
		emailValidation = emailValidationRepository.save(emailValidation);
		return new UserEmailValidationDTO(emailValidation);
	}
}
