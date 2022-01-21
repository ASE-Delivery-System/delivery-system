package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.User;
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
}
