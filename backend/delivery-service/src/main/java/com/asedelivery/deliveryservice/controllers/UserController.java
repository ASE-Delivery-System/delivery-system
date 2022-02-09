package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.UpdateUserRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.repository.UserRepository;
import com.asedelivery.deliveryservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        User user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<User>> getCustomers(){
        List<User> customers = userService.findCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/dispatchers")
    public ResponseEntity<List<User>> getDispatchers(){
        List<User> dispatchers = userService.findDispatchers();
        return ResponseEntity.ok(dispatchers);
    }

    @GetMapping("/deliverers")
    public ResponseEntity<List<User>> getDeliverers(){
        List<User> deliverers = userService.findDeliverers();
        return ResponseEntity.ok(deliverers);
    }

    @GetMapping("/firstName/{firstName}")
    public ResponseEntity<List<User>> getUsersByFirstName(@PathVariable String firstName){
        System.out.println(firstName);
        List<User> users = userService.findUsersByFirstName(firstName);
        System.out.println(users);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteUserById(@PathVariable String id){
        userService.deleteUserById(id);
        return ResponseEntity.ok(new MessageResponse("User was deleted successfully!"));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable String id, @RequestBody UpdateUserRequest user){

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        return ResponseEntity.ok( userService.updateUser(id,user));
    }
}
