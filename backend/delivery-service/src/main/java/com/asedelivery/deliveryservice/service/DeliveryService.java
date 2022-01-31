package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.Delivery;
import com.asedelivery.deliveryservice.payload.request.DeliveryRequest;

import java.util.List;

public interface DeliveryService {
    Delivery createDelivery(DeliveryRequest deliveryRequest);
    List<Delivery> getAllDeliveries();
    Delivery findDeliveryById(String id);
    Delivery updateDeliveryStatus(String id, DeliveryRequest deliveryRequest);
    List<Delivery> getAllDeliveriesOfDeliverer(String delivererId);
    List<Delivery> getAllActiveDeliveries(String customerId);
    List<Delivery> getAllPastDeliveries(String customerId);
}
