package com.leo.snacks.services;	

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.Order;
import com.leo.snacks.domain.Product;
import com.leo.snacks.domain.User;
import com.leo.snacks.domain.enums.OrderStatus;
import com.leo.snacks.dto.OrderDTO;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.dto.UserDTO;
import com.leo.snacks.repositories.OrderRepository;
import com.leo.snacks.repositories.ProductRepository;
import com.leo.snacks.repositories.UserRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = orderRepository.findAll();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), Instant.now(), dto.isPaymantToCard(), OrderStatus.PENDING);
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			order.getProduct().add(product);
		}
		for (UserDTO u : dto.getUsers()) {
			User user = userRepository.getOne(u.getId());
			order.getUser().add(user);
		}
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setDelivered(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.DELIVERED);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
}
