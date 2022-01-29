package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.Delivery;

import java.util.List;

public interface DeliveryService {
    Delivery createDelivery(Delivery delivery);
    List<Delivery> getAllDeliveries();
}
