package com.leo.snacks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.DeliverymanEmailValidation;
import com.leo.snacks.dto.DeliverymanEmailValidationDTO;
import com.leo.snacks.repositories.DeliverymanEmailValidationRepository;

@Service
public class DeliverymanEmailService {

    @Autowired
    private JavaMailSender emailSender;
    
	@Autowired
	private DeliverymanEmailValidationRepository repository;
    
    public void sendValidation(String to, String body, String topic) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("josecarlosdemedeirosfilho@gmail.com");
        message.setTo(to); 
        message.setSubject(body); 
        message.setText(topic);
        emailSender.send(message);
    }
	
	@Transactional(readOnly = true)
	public DeliverymanEmailValidationDTO searchEmail(String email) {
		DeliverymanEmailValidation emailValidation = repository.findByEmail(email);
		return new DeliverymanEmailValidationDTO(emailValidation);
	}
    
	@Transactional
	public DeliverymanEmailValidationDTO emailValidator(DeliverymanEmailValidationDTO dto) {
		Integer numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		}
		
		DeliverymanEmailValidation emailValidation = new DeliverymanEmailValidation(dto.getEmail(), "alguemseila2k18@gmail.com", numberRandom);
		if (repository.findByEmailEquals(dto.getEmail()) == null) {
			emailValidation = repository.save(emailValidation);
			return new DeliverymanEmailValidationDTO(emailValidation);
		}
		return new DeliverymanEmailValidationDTO(null);
	}
	
	@Transactional
	public DeliverymanEmailValidationDTO update(String email) {
		Integer numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		while (numberRandom > 1000000 || numberRandom < 100000) {
			numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		}

		DeliverymanEmailValidation emailValidation = repository.findByEmail(email);
		emailValidation.setNumberValidation(numberRandom);
		emailValidation = repository.save(emailValidation);
		return new DeliverymanEmailValidationDTO(emailValidation);
	}
}
