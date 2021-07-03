package com.leo.snacks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.leo.snacks.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("SELECT DISTINCT obj FROM Order obj JOIN obj.product "
			+ " WHERE obj.status = 0 ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProductsPending();
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN obj.product "
			+ " WHERE obj.status = 1 ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProductsConfirmed();
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN obj.product "
			+ " WHERE obj.status = 2 ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProductsReady();
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN obj.product "
			+ " WHERE obj.status = 3 ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProductsDelivered();
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN obj.product "
			+ " WHERE obj.delivery = true ORDER BY obj.moment ASC")
	List<Order> findByOrder();

	Order findByCode(Integer code);

}
