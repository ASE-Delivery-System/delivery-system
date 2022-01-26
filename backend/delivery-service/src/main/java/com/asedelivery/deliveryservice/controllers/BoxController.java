package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/boxes")
public class BoxController {

    @Autowired
    BoxService boxService;

    @GetMapping("") //GET /api/boxes
    public ResponseEntity<List<Box>> getAllBoxes() {
        List<Box> boxes = boxService.findAllBoxes();
        return ResponseEntity.ok().body(boxes);
    }

    @GetMapping("/{id}") //GET /api/boxes/{id}
    public ResponseEntity<Box> getBoxById(@PathVariable String id){
        Box box = boxService.findBoxById(id);
        return ResponseEntity.ok(box);
    }

//    @PostMapping
//    public ResponseEntity<Box> create(@RequestBody Box box) {
//        Box created = service.create(box);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(created.getId())
//                .toUri();
//        return ResponseEntity.created(location).body(created);
//    }

    @PostMapping("/{id}")
    public ResponseEntity<Box> updateBoxById(@PathVariable String id, @RequestBody Box box){
        return ResponseEntity.ok( boxServiceervice.updateBox(id,box));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBoxbyId (@PathVariable String id, @RequestBody Box box){
        return ResponseEntity.ok(boxService.updateBox(id,box));
    }
}
}