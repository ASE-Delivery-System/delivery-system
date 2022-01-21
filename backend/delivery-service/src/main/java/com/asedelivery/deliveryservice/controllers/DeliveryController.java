package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @GetMapping("")
    public ResponseEntity<MessageResponse> getTestApi(){
        return ResponseEntity.ok(new MessageResponse("Test api of deliveries. To be implemented with auth!"));
    }
}
