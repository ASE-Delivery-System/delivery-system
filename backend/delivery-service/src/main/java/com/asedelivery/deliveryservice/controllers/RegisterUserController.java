package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.ERole;
import com.asedelivery.deliveryservice.models.Role;
import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.UserRegisterObj;
import com.asedelivery.deliveryservice.payload.request.RegisterUserRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.repository.RoleRepository;
import com.asedelivery.deliveryservice.repository.UserRepository;
import com.asedelivery.deliveryservice.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user/auth")
public class RegisterUserController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private RestTemplate restTemplate;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserRequest registerUserRequest) {

		if (userRepository.existsByUsername(registerUserRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(registerUserRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(registerUserRequest.getUsername(),
				registerUserRequest.getEmail(),
							 encoder.encode(registerUserRequest.getPassword()), registerUserRequest.getFirstName(),
							 registerUserRequest.getLastName(), registerUserRequest.getAddress() );

		Set<String> strRoles = registerUserRequest.getRoles();
		System.out.println(strRoles);
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "dispatcher":
					Role adminRole = roleRepository.findByName(ERole.ROLE_DISPATCHER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "deliverer":
					Role modRole = roleRepository.findByName(ERole.ROLE_DELIVERER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);

		List<String> authorities = user.getRoles().stream()
				.map(role -> role.getName().name())
				.collect(Collectors.toList());

		if (authorities.contains("ROLE_DELIVERER") || authorities.contains("ROLE_CUSTOMER")){
			user.setRfidToken(registerUserRequest.getRfidToken());
		}

		UserRegisterObj user_to_be_registered = new UserRegisterObj(registerUserRequest.getUsername(),registerUserRequest.getEmail(),registerUserRequest.getPassword());
		user_to_be_registered.setRoles(registerUserRequest.getRoles());

		// HERE WE MAKE THE CALL TO THE IDENTITY SERVICE TO ACTUALLY SIGN UP THE USER THAT WE WANT TO REGISTER BUT ONLY WITH
		// THE INFORMATION NEEDED TO LOG IN (IE. USERNAME PASSWORD EMAIL) NOTHING MORE THAN THOSE INFOS
		restTemplate.postForObject("https://ase-identity-service.herokuapp.com/api/auth/signup", user_to_be_registered, String.class);

		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User to be registered registered successfully!"));
	}
}
