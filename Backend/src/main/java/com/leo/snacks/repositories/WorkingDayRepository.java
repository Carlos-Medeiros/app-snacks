package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.WorkingDay;


public interface WorkingDayRepository extends JpaRepository<WorkingDay, Long> {

}
