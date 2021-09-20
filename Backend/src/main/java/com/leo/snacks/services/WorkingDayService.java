package com.leo.snacks.services;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.dto.HuorNowDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.WorkingDay;
import com.leo.snacks.dto.WorkingDayDTO;
import com.leo.snacks.exception.BusinessRuleException;
import com.leo.snacks.repositories.WorkingDayRepository;

@Service
public class WorkingDayService {

	@Autowired
	private WorkingDayRepository repository;
	
	@Transactional(readOnly = true)
	public List<WorkingDayDTO> findAll() {
		List<WorkingDay> list = repository.findAllByOrderByIdAsc();
		return list.stream().map(x -> new WorkingDayDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public WorkingDayDTO search(Long id) {
		WorkingDay workingDay = repository.getOne(id);
		return new WorkingDayDTO(workingDay);
	}
	
	@Transactional
	public WorkingDayDTO insert(WorkingDayDTO dto) {
		WorkingDay workingDay = new WorkingDay(null, dto.getName(), dto.getOpeningTime(), dto.getClosingTime(), false);
		if(dto.getName() == null) {
			throw new BusinessRuleException("the working day name cannot be null");
		}
		if(dto.getOpeningTime() == null) {
			throw new BusinessRuleException("the working day opening time cannot be null");
		}
		if(dto.getClosingTime() == null) {
			throw new BusinessRuleException("the working day closing time cannot be null");
		} else {
			workingDay = repository.save(workingDay);
			return new WorkingDayDTO(workingDay);
		}
	}

	@Transactional
	public void setName(WorkingDayDTO dto, Long id) {
		repository
				.findById(id)
				.map( workingDay -> {
					workingDay.setName(dto.getName());
					return repository.save(workingDay);
				}).orElseThrow(() -> new BusinessRuleException("Working day not found"));
	}

	@Transactional
	public void setOpeningTime(WorkingDayDTO dto, Long id) {
		repository
				.findById(id)
				.map( workingDay -> {
					workingDay.setOpeningTime(dto.getOpeningTime());
					return repository.save(workingDay);
				}).orElseThrow(() -> new BusinessRuleException("Working day not found"));
	}

	@Transactional
	public void setClosingTime(WorkingDayDTO dto, Long id) {
		repository
				.findById(id)
				.map( workingDay -> {
					workingDay.setClosingTime(dto.getClosingTime());
					return repository.save(workingDay);
				}).orElseThrow(() -> new BusinessRuleException("Working day not found"));
	}

	@Transactional
	public WorkingDayDTO isOpen(HuorNowDTO hours) {
		Calendar today = Calendar.getInstance();
		Integer dayOfTheWeek = today.get(Calendar.DAY_OF_WEEK);
		WorkingDay workingDay = repository.getOne(Long.valueOf(dayOfTheWeek));
		repository
				.findById(workingDay.getId())
				.map( wkDay -> {
					if (wkDay.getOpeningTime() == null || wkDay.getClosingTime() == null) {
						wkDay.setOpen(false);
					}
					else {
						if(hours.getHour() >= wkDay.getOpeningTime() && hours.getHour() < wkDay.getClosingTime()) {
							wkDay.setOpen(true);
						} else {
							wkDay.setOpen(false);
						}

					}
					return repository.save(wkDay);
				}).orElseThrow(() -> new BusinessRuleException("Working day not found"));
		return new WorkingDayDTO(workingDay);
	}

	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}
}
