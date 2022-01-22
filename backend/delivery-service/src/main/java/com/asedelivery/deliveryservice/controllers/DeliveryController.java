package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @GetMapping("")
    public ResponseEntity<MessageResponse> getTestApi(){
        return ResponseEntity.ok(new MessageResponse("Test api of deliveries. To be implemented with auth!"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> getTestApiById1(@PathVariable String id){
        return ResponseEntity.ok(new MessageResponse("Test api of deliveries test by id 1."));
    }
}
