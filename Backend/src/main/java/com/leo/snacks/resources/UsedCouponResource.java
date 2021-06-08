package com.leo.snacks.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leo.snacks.dto.UsedCouponDTO;
import com.leo.snacks.services.UsedCouponService;

@RestController
public class UsedCouponResource {
	
	@Autowired
	private UsedCouponService service;
	
	@PostMapping("/couponValidation")
	public ResponseEntity<UsedCouponDTO> couponValidation(@RequestBody UsedCouponDTO dto) {
		dto = service.couponValidation(dto);
		return ResponseEntity.ok().body(dto);
	}
	
	/*@PostMapping("/registerUsedCoupon")
	public ResponseEntity<UsedCouponDTO> registerUsedCoupon(@RequestBody UsedCouponDTO dto) {
		dto = service.registerUsedCoupon(dto);
		return ResponseEntity.ok().body(dto);
	}*/
}
