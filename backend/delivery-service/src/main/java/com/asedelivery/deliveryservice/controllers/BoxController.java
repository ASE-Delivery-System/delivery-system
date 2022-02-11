package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.*;
import com.asedelivery.deliveryservice.payload.request.BoxStatusUpdateRequest;
import com.asedelivery.deliveryservice.payload.request.RegisterNewBoxRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.repository.BoxRepository;
import com.asedelivery.deliveryservice.repository.DeliveryRepository;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.asedelivery.deliveryservice.service.UserService;
import com.asedelivery.deliveryservice.payload.request.BoxUserAuthorizationRequest;

import javax.validation.Valid;
import java.util.ArrayList;
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

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    BoxRepository boxRepository;

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

    @PostMapping("/box_closed")
    public ResponseEntity<MessageResponse> BoxStatus(@Valid @RequestBody BoxUserAuthorizationRequest boxRequest){
        Box actualBox = boxService.findBoxById(boxRequest.getBox_id());
        User actualUser = userService.findUserByRfidToken(boxRequest.getUser_id());

        List<String> userRoles = actualUser.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        if (boxRequest.getStatus_closed().equals("available")){//box properly closed
            if (userRoles.contains("ROLE_CUSTOMER")){
                List<Delivery> customerDeliveries = deliveryService.getDeliveredDeliveriesOfCustomer(actualUser.getId());

                for (Delivery customDelivery: customerDeliveries){
                    if(customDelivery.getTargetBox().getId().equals(actualBox.getId()))
                    {
                        customDelivery.setStatus(EDeliveryStatus.PICKED_UP);
                        deliveryRepository.save(customDelivery);
                    }
                }

                actualBox.setCustomer(null);
                actualBox.setDeliverer(null);
                List<Delivery> emptyList = new ArrayList<>();
                actualBox.setDeliveries(emptyList);
                boxRepository.save(actualBox);

                boxService.updateBoxStatus(actualBox.getId(), EBoxStatus.EMPTY);

                return ResponseEntity.ok(new MessageResponse("Status of box with id: "+actualBox.getId()+" has been changed!"));

            }
            else
                if (userRoles.contains("ROLE_DELIVERER"))
                {
                    List<Delivery> delivererDeliveries = deliveryService.getOutForDeliveryDeliveries(actualUser.getId());

                    for (Delivery delivererDelivery: delivererDeliveries){
                        if(actualBox.getCustomer().getId().equals(delivererDelivery.getCustomer().getId())){
                            if(delivererDelivery.getTargetBox().getId().equals(actualBox.getId()))
                            {
                                delivererDelivery.setStatus(EDeliveryStatus.DELIVERED);
                                deliveryRepository.save(delivererDelivery);
                            }
                        }
                    }
                    return ResponseEntity.ok(new MessageResponse("Status of box with id: "+actualBox.getId()+" has been changed!"));
                }
        }
        return ResponseEntity.ok(new MessageResponse("Status of box with id: "+actualBox.getId()+" has not been changed!"));

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