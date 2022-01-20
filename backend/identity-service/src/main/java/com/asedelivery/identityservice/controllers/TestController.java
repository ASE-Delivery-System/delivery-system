package com.asedelivery.identityservice.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/customer")
	@PreAuthorize("hasRole('CUSTOMER')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/deliverer")
	@PreAuthorize("hasRole('DELIVERER')")
	public String moderatorAccess() {
		return "DELIVERER Board.";
	}

	@GetMapping("/dispatcher")
	@PreAuthorize("hasRole('DISPATCHER')")
	public String adminAccess() {
		return "DISPATCHER Board.";
	}

	@PostMapping("/alert")
	public String alert() {
		return "Alert alert.";
	}
}
