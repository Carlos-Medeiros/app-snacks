package com.leo.snacks.services;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.WorkingDay;
import com.leo.snacks.dto.WorkingDayDTO;
import com.leo.snacks.repositories.WorkingDayRepository;

@Service
public class WorkingDayService {

	@Autowired
	private WorkingDayRepository repository;
	
	@Transactional(readOnly = true)
	public List<WorkingDayDTO> findAll() {
		List<WorkingDay> list = repository.findAll();
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
		workingDay = repository.save(workingDay);
		return new WorkingDayDTO(workingDay);
	}
	
	@Transactional
	public WorkingDayDTO update(WorkingDayDTO dto) {
		search(dto.getId());
		WorkingDay workingDay = repository.getOne(dto.getId());
		workingDay.setOpeningTime(dto.getOpeningTime());
		workingDay.setClosingTime(dto.getClosingTime());
		workingDay = repository.save(workingDay);
		return new WorkingDayDTO(workingDay);
	}
	
	@Transactional
	public WorkingDayDTO isOpen() {
		Calendar today = Calendar.getInstance();
		Integer dayOfTheWeek = today.get(Calendar.DAY_OF_WEEK);
		Integer hourOfDay = today.get(Calendar.HOUR_OF_DAY);

		WorkingDay workingDay = repository.getOne(Long.valueOf(dayOfTheWeek));
		if (workingDay.getOpeningTime() == null || workingDay.getClosingTime() == null) {
			workingDay.setOpen(false);
			workingDay = repository.save(workingDay);
		}
		else {
			if(hourOfDay >= workingDay.getOpeningTime()) {
				workingDay.setOpen(true);
				workingDay = repository.save(workingDay);
			}
			if(hourOfDay > workingDay.getClosingTime()) {
				workingDay.setOpen(false);
				workingDay = repository.save(workingDay);
			}
			
		}
		return new WorkingDayDTO(workingDay);
	}
	
	@Transactional
	public void delete(Long id) {
		search(id);
		repository.deleteById(id);
	}
}
