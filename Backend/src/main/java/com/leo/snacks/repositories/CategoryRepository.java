package com.leo.snacks.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leo.snacks.domain.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {

}
