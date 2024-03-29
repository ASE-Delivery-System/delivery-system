package com.asedelivery.deliveryservice.controllers;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.models.EBoxStatus;
import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.DeliveryRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.service.DeliveryService;
import com.asedelivery.deliveryservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @Autowired
    DeliveryService deliveryService;

    @Autowired
    BoxService boxService;

    @Autowired
    UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_DISPATCHER')")
    public ResponseEntity<List<Delivery>> getAllDeliveries(){
        return ResponseEntity.ok( deliveryService.getAllDeliveries());
    }

    @GetMapping("/{id}/out-for-delivery")
    public ResponseEntity<List<Delivery>> getOutForDeliveryDeliveries(@PathVariable String id){
        return ResponseEntity.ok( deliveryService.getOutForDeliveryDeliveries(id));
    }

    @GetMapping("/{id}/delivered")
    public ResponseEntity<List<Delivery>> getDeliveredDeliveries(@PathVariable String id){
        return ResponseEntity.ok( deliveryService.getDeliveredDeliveriesOfCustomer(id));
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_DISPATCHER')")
    public ResponseEntity<?> createDelivery(@Valid @RequestBody DeliveryRequest deliveryRequest){

        Box targetBox = boxService.findBoxById(deliveryRequest.getTargetBoxId());
        User deliverer = userService.findUserById(deliveryRequest.getDelivererId());
        User customer = userService.findUserById(deliveryRequest.getCustomerId());

        if (Objects.isNull(targetBox)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Target box Not Found"));
        } else if (Objects.isNull(deliverer)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Deliverer Not Found"));
        } else if (Objects.isNull(customer)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Customer Not Found"));
        }

        if (targetBox.getStatus() == EBoxStatus.TAKEN) {

            if (!Objects.equals(targetBox.getCustomer().getId(), customer.getId())){
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Target Box already taken by another customer!"));
            }
        }

        Delivery createdDelivery  = deliveryService.createDelivery(deliveryRequest);

        return ResponseEntity.ok().body(createdDelivery);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getDeliveryById(@PathVariable String id){
        Delivery delivery = deliveryService.findDeliveryById(id);
        if (Objects.isNull(delivery)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Delivery box Not Found"));
        }
        return ResponseEntity.ok( delivery);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDeliveryById(@PathVariable String id){
        Delivery delivery = deliveryService.findDeliveryById(id);

        if (Objects.isNull(delivery)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Delivery Not Found"));
        }
        deliveryService.deleteDeliveryById(id);
        return ResponseEntity.ok( new MessageResponse("Delivery deleted") );
    }

    @PostMapping("/status/{id}")
    public ResponseEntity<?> updateDeliveryStatus(@RequestBody DeliveryRequest deliveryRequest, @PathVariable String id){

        Delivery delivery = deliveryService.findDeliveryById(id);

        if (Objects.isNull(delivery)) {
            return ResponseEntity
                    .badRequest()
                    .body( new MessageResponse("Delivery Not Found"));
        }

        Delivery updatedDelivery = deliveryService.updateDeliveryStatus(id,deliveryRequest);

        return ResponseEntity.ok(updatedDelivery);
    }

    @GetMapping("/deliverer/{id}")
    public ResponseEntity<List<Delivery>> getAllDeliveriesOfDeliverer(@PathVariable String id){
        return  ResponseEntity.ok().body(deliveryService.getAllDeliveriesOfDeliverer(id));
    }

    @GetMapping("/customer/active/{id}")
    public ResponseEntity<List<Delivery>> getAllActiveDeliveries(@PathVariable String id){
        return  ResponseEntity.ok().body(deliveryService.getAllActiveDeliveries(id));
    }

    @GetMapping("/customer/past/{id}")
    public ResponseEntity<List<Delivery>> getAllPastDeliveries(@PathVariable String id){
        System.out.println(id);
        return  ResponseEntity.ok().body(deliveryService.getAllPastDeliveries(id));
    }

}
