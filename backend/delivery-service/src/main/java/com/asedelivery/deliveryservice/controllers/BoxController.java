package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.models.EBoxStatus;
import com.asedelivery.deliveryservice.payload.request.RegisterNewBoxRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.security.jwt.JwtUtils;

import com.asedelivery.deliveryservice.service.DeliveryService;
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
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/boxes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoxController {

    @Autowired
    BoxService boxService;

    @Autowired
    DeliveryService deliveryService;

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

    @PostMapping()
    public ResponseEntity<?> createBox(@Valid @RequestBody RegisterNewBoxRequest newBoxRequest) {

        if (boxService.existsByName(newBoxRequest.getName())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Name of RPI is already taken!"));
        }


        System.out.println(newBoxRequest.getStatus());
        Box newBox = new Box(newBoxRequest.getName(),newBoxRequest.getAddress(), newBoxRequest.getStatus());
        System.out.println(newBox.getId());

        Box created = boxService.createBox(newBox);
        System.out.println(created.getId());
        return ResponseEntity.ok().body(created);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateBoxById(@PathVariable String id, @RequestBody Box box){
        Box boxToBeUpdated = boxService.findBoxById(id);

        if (Objects.isNull(boxToBeUpdated)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Box Not Found"));
        }
        return ResponseEntity.ok( boxService.updateBox(id,box));
    }

    @PostMapping("/status/{id}")
    public ResponseEntity<?> updateBoxStatusById(@PathVariable String id, @RequestBody String status){
        Box boxToBeUpdated = boxService.findBoxById(id);

        if (Objects.isNull(boxToBeUpdated)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Box Not Found"));
        }

        return ResponseEntity.ok( boxService.updateBoxStatus(id, EBoxStatus.valueOf(status)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBoxById (@PathVariable String id){
        boxService.deleteBoxById(id);
        return ResponseEntity.ok(new MessageResponse("Box with id: "+id+" has been deleted!"));
    }
}