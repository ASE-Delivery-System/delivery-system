package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.models.EBoxStatus;
import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.DeliveryRequest;
import com.asedelivery.deliveryservice.payload.request.EmailRequest;
import com.asedelivery.deliveryservice.payload.request.UserRegisterObj;
import com.asedelivery.deliveryservice.payload.response.MessageResponse;
import com.asedelivery.deliveryservice.repository.BoxRepository;
import com.asedelivery.deliveryservice.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
        Delivery createDelivery = deliveryRepository.save(newDelivery);

        // TODO: Update target box *******************
        List<Delivery> deliveryList = new ArrayList<>();
        deliveryList.add(createDelivery);

        System.out.println(deliveryList.get(0).getId());
        System.out.println(deliveryList.get(0).getStatus());

        targetBox.setCustomer(customer);
        targetBox.setDeliverer(deliverer);
        targetBox.setStatus(EBoxStatus.TAKEN);
        targetBox.setDeliveries(deliveryList);

        boxRepository.save(targetBox);

        // TODO: Uncomment and adapt after the emailing service is ready
//        EmailRequest emailToBeSend = new EmailRequest();
//        emailToBeSend.setTo(customer.getEmail());
//        emailToBeSend.setStatus("New delivery Created");
//
//        // Do e post request to email service!
//        restTemplate.postForObject("https://ase-emailing-service.herokuapp.com/api/email/send", emailToBeSend, String.class);

        return createDelivery;
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
}
