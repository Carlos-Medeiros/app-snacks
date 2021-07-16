package com.leo.snacks.services;	

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.DeliveryTax;
import com.leo.snacks.domain.Order;
import com.leo.snacks.domain.OrderStatus;
import com.leo.snacks.domain.Product;
import com.leo.snacks.dto.DeliveryTaxDTO;
import com.leo.snacks.dto.OrderDTO;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.repositories.DeliveryTaxRepository;
import com.leo.snacks.repositories.OrderRepository;
import com.leo.snacks.repositories.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private DeliveryTaxRepository deliveryTaxRepository;

	@Transactional(readOnly = true)
	public OrderDTO search(Long id) {
		Order order = orderRepository.getOne(id);
		return new OrderDTO(order);
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllPending() {
		List<Order> list = orderRepository.findOrdersWithProductsPending();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllConfirmed() {
		List<Order> list = orderRepository.findOrdersWithProductsConfirmed();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllReadyForDelivery() {
		List<Order> list = orderRepository.findOrdersWithProductsReadyForDelivered();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllReadyForPickup() {
		List<Order> list = orderRepository.findOrdersWithProductsReadyForPickup();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllDelivered() {
		List<Order> list = orderRepository.findOrdersWithProductsDelivered();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Integer numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		while (numberRandom > 1000000 || numberRandom < 100000 && orderRepository.findByCode(numberRandom) != null) {
			numberRandom = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		}
		
		Order order = new Order(null, numberRandom, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), dto.getDetails(), Instant.now(), dto.isPaymantToCard(), dto.isDelivery(), OrderStatus.PENDING);
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			order.getProduct().add(product);
		}
		
		if (order.isDelivery() == true) {
			for (DeliveryTaxDTO dt : dto.getDeliveryTax()) {
				DeliveryTax delieryTax = deliveryTaxRepository.getOne(dt.getId());
				order.getDeliveryTax().add(delieryTax);
			}
		}
		order = orderRepository.save(order);
		return new OrderDTO(order);
		
	}
	
	@Transactional
	public OrderDTO setPending(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.PENDING);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setConfirmed(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.CONFIRMED);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setReady(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.READY);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setPickup(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.PICKUP);
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
	
	
	@Transactional
	public void delete(Long id) {
		search(id);
		orderRepository.deleteById(id);
	}
}
