package com.asedelivery.identityservice.controllers;


import com.asedelivery.identityservice.models.ERole;
import com.asedelivery.identityservice.models.Role;
import com.asedelivery.identityservice.models.User;
import com.asedelivery.identityservice.payload.request.UpdateUserRequest;
import com.asedelivery.identityservice.payload.response.MessageResponse;
import com.asedelivery.identityservice.repository.RoleRepository;
import com.asedelivery.identityservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users/auth")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().body("User deleted from auth database");
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest updateUserRequest, @PathVariable String id) throws Exception {

        Optional<User> userToBeUpdated = userRepository.findById(id);

        if (userToBeUpdated.isEmpty()){
            return ResponseEntity.status(404).body(new MessageResponse("User to be updated is not found"));
        }

        if (!updateUserRequest.getUsername().equals(userToBeUpdated.get().getUsername())){
            if (userRepository.existsByUsername(updateUserRequest.getUsername())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Username is already taken!"));
            }

            if (userRepository.existsByEmail(updateUserRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }
        }

        userToBeUpdated.get().setEmail(updateUserRequest.getEmail());
        userToBeUpdated.get().setUsername(updateUserRequest.getUsername());

        String strRoles = updateUserRequest.getRole();
        System.out.println(strRoles);
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            switch (strRoles) {
                case "dispatcher":
                    Role dispatcherRole = roleRepository.findByName(ERole.ROLE_DISPATCHER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(dispatcherRole);
                    break;
                case "deliverer":
                    Role delivererRole = roleRepository.findByName(ERole.ROLE_DELIVERER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(delivererRole);
                    break;
                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
            }

        }
        userToBeUpdated.get().setRoles(roles);
        userRepository.save(userToBeUpdated.get());


        return ResponseEntity.ok().body("User updated in auth database");
    }
}
