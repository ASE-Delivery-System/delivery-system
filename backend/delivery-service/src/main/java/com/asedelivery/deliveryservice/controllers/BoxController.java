package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.models.EBoxStatus;
import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.BoxStatusUpdateRequest;
import com.asedelivery.deliveryservice.payload.request.RegisterNewBoxRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.asedelivery.deliveryservice.service.UserService;
import com.asedelivery.deliveryservice.payload.request.BoxUserAuthorizationRequest;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/boxes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoxController {

    @Autowired
    BoxService boxService;

    @Autowired
    UserService userService;

    @Autowired
    DeliveryService deliveryService;

    @GetMapping("") //GET /api/boxes
    @PreAuthorize("hasRole('ROLE_DISPATCHER')")
    public ResponseEntity<List<Box>> getAllBoxes() {
        List<Box> boxes = boxService.findAllBoxes();
        return ResponseEntity.ok().body(boxes);
    }

    @PostMapping("/user_authorization")
    public String OpenBox(@Valid @RequestBody BoxUserAuthorizationRequest boxRequest){

        Box actualBox = boxService.findBoxById(boxRequest.getBox_id());
        User actualUser = userService.findUserByRfidToken(boxRequest.getUser_id());

        if (Objects.isNull(actualBox)) {
            return "204"; //box not found in the db
        }
        else if (Objects.isNull(actualUser)) {
            return "204"; //user not found in the db
        }
        List<String> userRoles = actualUser.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        //check if delivery in this box belongs to this user
        if (userRoles.contains("ROLE_DELIVERER")){
            List<Delivery> delivererDeliveries = deliveryService.getOutForDeliveryDeliveries(actualUser.getId());
            if (!delivererDeliveries.isEmpty())
            {
                List<String> boxesDeliverer = delivererDeliveries.stream()
                        .map(delivery->delivery.getTargetBox().getId())
                        .collect(Collectors.toList());
                if(boxesDeliverer.contains(actualBox.getId())){
                    return "200";
                }
            }
        }
        else if (userRoles.contains("ROLE_CUSTOMER")){
            List<Delivery> customerDeliveries = deliveryService.getDeliveredDeliveriesOfCustomer(actualUser.getId());
            if (!customerDeliveries.isEmpty())
            {
                List<String> boxesCustomer = customerDeliveries.stream()
                        .map(delivery->(delivery.getTargetBox().getId()))
                        .collect(Collectors.toList());
                if(boxesCustomer.contains(actualBox.getId()))
                    return "200";
            }
        }
        return "204";
    }

    @GetMapping("/empty") //GET /api/boxes
    public ResponseEntity<List<Box>> getAllEmptyBoxes() {
        List<Box> boxes = boxService.findAllEmptyBoxes();
        return ResponseEntity.ok().body(boxes);
    }

    @GetMapping("/{id}") //GET /api/boxes/{id}
    public ResponseEntity<Box> getBoxById(@PathVariable String id){
        Box box = boxService.findBoxById(id);
        return ResponseEntity.ok(box);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_DISPATCHER')")
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
    public ResponseEntity<?> updateBoxStatusById(@PathVariable String id, @RequestBody BoxStatusUpdateRequest status){
        Box boxToBeUpdated = boxService.findBoxById(id);

        if (Objects.isNull(boxToBeUpdated)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Box Not Found"));
        }

        return ResponseEntity.ok( boxService.updateBoxStatus(id, EBoxStatus.valueOf(status.getStatus())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteBoxById (@PathVariable String id){
        boxService.deleteBoxById(id);
        return ResponseEntity.ok(new MessageResponse("Box with id: "+id+" has been deleted!"));
    }
}