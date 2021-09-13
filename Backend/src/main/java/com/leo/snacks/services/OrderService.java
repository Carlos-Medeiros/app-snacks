package com.leo.snacks.services;	

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.leo.snacks.dto.CategoryDTO;
import com.leo.snacks.exception.BusinessRuleException;
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
	public OrderDTO searchCode(Integer code) {
		Order order = orderRepository.findByCode(code);
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
		
		Order order = new Order(null, dto.getCode(), dto.getAddress(), dto.getLatitude(), dto.getLongitude(), dto.getDetails(), Instant.now(), dto.isPaymantToCard(), dto.getChange(), dto.isDelivery(), OrderStatus.PENDING);
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
		if (order.isPaymantToCard() == true) {
			order.setChange(null);
		}

		if (orderRepository.findByCode(dto.getCode()) == null) {
			order = orderRepository.save(order);
			return new OrderDTO(order);
		}

		throw new BusinessRuleException("Existing code");
	}

	@Transactional
	public void setPending(Long id) {
		orderRepository
				.findById(id)
				.map( order -> {
					order.setStatus(OrderStatus.PENDING);
					return orderRepository.save(order);
				}).orElseThrow(() -> new BusinessRuleException("Order not found"));
	}

	@Transactional
	public void setConfirmed(Long id) {
		orderRepository
				.findById(id)
				.map( order -> {
					order.setStatus(OrderStatus.CONFIRMED);
					return orderRepository.save(order);
				}).orElseThrow(() -> new BusinessRuleException("Order not found"));
	}

	@Transactional
	public void setDelivery(Long id) {
		orderRepository
				.findById(id)
				.map( order -> {
					order.setStatus(OrderStatus.DELIVERY);
					return orderRepository.save(order);
				}).orElseThrow(() -> new BusinessRuleException("Order not found"));
	}

	@Transactional
	public void setPickup(Long id) {
		orderRepository
				.findById(id)
				.map( order -> {
					order.setStatus(OrderStatus.PICKUP);
					return orderRepository.save(order);
				}).orElseThrow(() -> new BusinessRuleException("Order not found"));
	}

	@Transactional
	public void setDelivered(Long id) {
		orderRepository
				.findById(id)
				.map( order -> {
					order.setStatus(OrderStatus.DELIVERED);
					return orderRepository.save(order);
				}).orElseThrow(() -> new BusinessRuleException("Order not found"));
	}
	
	@Transactional
	public void delete(Long id) {
		search(id);
		orderRepository.deleteById(id);
	}
}
