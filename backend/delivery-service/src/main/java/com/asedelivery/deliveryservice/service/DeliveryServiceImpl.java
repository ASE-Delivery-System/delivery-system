package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.*;
import com.asedelivery.deliveryservice.payload.request.DeliveryRequest;
import com.asedelivery.deliveryservice.payload.request.EmailRequest;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.repository.BoxRepository;
import com.asedelivery.deliveryservice.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DeliveryServiceImpl implements DeliveryService{

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    DeliveryService deliveryService;

    @Autowired
    BoxService boxService;

    @Autowired
    UserService userService;

    @Autowired
    BoxRepository boxRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Delivery createDelivery(DeliveryRequest deliveryRequest) {

        Box targetBox = boxService.findBoxById(deliveryRequest.getTargetBoxId());
        User deliverer = userService.findUserById(deliveryRequest.getDelivererId());
        User customer = userService.findUserById(deliveryRequest.getCustomerId());

        Delivery newDelivery = new Delivery(targetBox,customer,deliverer,deliveryRequest.getStatus());
        Delivery createdDelivery = deliveryRepository.save(newDelivery);

        List<Delivery> deliveryList = new ArrayList<>();
        deliveryList.add(createdDelivery);

        System.out.println(deliveryList.get(0).getId());
        System.out.println(deliveryList.get(0).getStatus());

        targetBox.setCustomer(customer);
        targetBox.setDeliverer(deliverer);
        targetBox.setStatus(EBoxStatus.TAKEN);

        List<Delivery> deliveryListInTargetBox = targetBox.getDeliveries();

        if (targetBox.getDeliveries() != null && targetBox.getDeliveries().size() > 0) {
            deliveryListInTargetBox.add(createdDelivery);
        }

        if (targetBox.getDeliveries() == null || targetBox.getDeliveries().size() == 0){
            targetBox.setDeliveries(deliveryList);
        }

        boxRepository.save(targetBox);


        EmailRequest emailToBeSend = new EmailRequest();
        emailToBeSend.setTo("pellumbbaboci97@gmail.com");
        emailToBeSend.setStatus("newDelivery");

        // Do e post request to email service!
        restTemplate.postForObject("https://ase-email-service.herokuapp.com/api/send", emailToBeSend, String.class);
        System.out.println("sent success");
        return createdDelivery;
    }

    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public Delivery findDeliveryById(String id) {
        return deliveryRepository.findDeliveryById(id);
    }

    @Override
    public Delivery updateDeliveryStatus(String id, DeliveryRequest deliveryRequest) {
        Delivery delivery = findDeliveryById(id);
        delivery.setStatus(deliveryRequest.getStatus());
        return deliveryRepository.save(delivery);
    }

    @Override
    public List<Delivery> getAllDeliveriesOfDeliverer(String delivererId) {
        return deliveryRepository.findDeliveriesByDeliverer_Id(delivererId);
    }

    @Override
    public List<Delivery> getAllActiveDeliveries(String customerId) {
        return deliveryRepository.findAllActiveDeliveries(customerId, EDeliveryStatus.PICKED_UP);
    }

    @Override
    public List<Delivery> getAllPastDeliveries(String customerId) {
        return deliveryRepository.findAllPastDeliveries(customerId,EDeliveryStatus.PICKED_UP);
    }

    @Override
    public void deleteDeliveryById(String id) {
        Delivery deliveryToBeDeleted = deliveryService.findDeliveryById(id);

        Box targetBox = boxService.findBoxById(deliveryToBeDeleted.getTargetBox().getId());

        // Delete delivery from the list
        List<Delivery> deliveryList = targetBox.getDeliveries()
                .stream()
                .filter(delivery -> !Objects.equals(delivery.getId(), id))
                .collect(Collectors.toList());

        targetBox.setDeliveries(deliveryList);
        Box deletedDeliveryFromBox = boxRepository.save(targetBox);

        // Update the status of the box to empty if in target box there are not more deliveries
        if (deletedDeliveryFromBox.getDeliveries() == null || deletedDeliveryFromBox.getDeliveries().size() == 0){
            boxService.updateBoxStatus(targetBox.getId(), EBoxStatus.EMPTY);
        }
        // delete the delivery
        deliveryRepository.deleteById(id);
    }

    @Override
    public List<Delivery> getOutForDeliveryDeliveries(String delivererId) {
        return deliveryRepository.findOutForDeliveryDeliveriesOfDeliverer(delivererId, EDeliveryStatus.OUT_FOR_DELIVERY);
    }

    @Override
    public List<Delivery> getDeliveredDeliveriesOfCustomer(String customerId) {
        return deliveryRepository.findDeliveredDeliveriesOfCustomer(customerId, EDeliveryStatus.DELIVERED);
    }

}
