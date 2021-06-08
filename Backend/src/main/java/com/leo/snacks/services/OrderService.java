package com.leo.snacks.services;	

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leo.snacks.domain.DeliveryTax;
import com.leo.snacks.domain.DiscountCoupon;
import com.leo.snacks.domain.Order;
import com.leo.snacks.domain.OrderStatus;
import com.leo.snacks.domain.OrderStatusClient;
import com.leo.snacks.domain.Product;
import com.leo.snacks.domain.UsedCoupon;
import com.leo.snacks.domain.User;
import com.leo.snacks.dto.DeliveryTaxDTO;
import com.leo.snacks.dto.DiscountCouponDTO;
import com.leo.snacks.dto.OrderDTO;
import com.leo.snacks.dto.ProductDTO;
import com.leo.snacks.dto.UserDTO;
import com.leo.snacks.repositories.DeliveryTaxRepository;
import com.leo.snacks.repositories.DiscountCouponRepository;
import com.leo.snacks.repositories.OrderRepository;
import com.leo.snacks.repositories.ProductRepository;
import com.leo.snacks.repositories.UsedCouponRepository;
import com.leo.snacks.repositories.UserRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private DiscountCouponRepository discountCouponRepository;
	
	@Autowired
	private UsedCouponRepository repository;
	
	@Autowired
	private DeliveryTaxRepository deliveryTaxRepository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = orderRepository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAllEmail(String Email) {
		List<Order> list = orderRepository.findOrdersWithProducts();
		list = orderRepository.findByClientEmail(Email);
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), Instant.now(), dto.isPaymantToCard(), dto.isDelivery(), dto.isCoupon(), OrderStatus.PENDING, OrderStatusClient.PENDING);
		for (ProductDTO p : dto.getProducts()) {
			Product product = productRepository.getOne(p.getId());
			order.getProduct().add(product);
		}
		String emailUser=  "";
		for (UserDTO u : dto.getUsers()) {
			User user = userRepository.findByEmail(u.getEmail());
			emailUser = u.getEmail();
			order.setClientEmail(emailUser);
			order.getUser().add(user);
		}
		String codeCoupon = "";
		for (DiscountCouponDTO d : dto.getDiscountCoupon()) {
			DiscountCoupon discountCoupon = discountCouponRepository.findByCode(d.getCode());
			codeCoupon = d.getCode();
			order.setCoupon(true);
			order.getDiscountCoupon().add(discountCoupon);
		}
		if (order.isCoupon() == true) {
			UsedCoupon usedCoupon = new UsedCoupon(emailUser, codeCoupon);
			if (repository.findByEmailAndUsedCode(emailUser, codeCoupon) == null) {
				usedCoupon = repository.save(usedCoupon);
			}
			else {
				usedCoupon = repository.save(null);
			}
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
	public OrderDTO setProduction(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatusClient(OrderStatusClient.PRODUCTION);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setTraffic(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatusClient(OrderStatusClient.TRAFFIC);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
	
	@Transactional
	public OrderDTO setDelivered(Long id) {
		Order order = orderRepository.getOne(id);
		order.setStatus(OrderStatus.DELIVERED);
		order.setStatusClient(OrderStatusClient.DELIVERED);
		order = orderRepository.save(order);
		return new OrderDTO(order);
	}
}
