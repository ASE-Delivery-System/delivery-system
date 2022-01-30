package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {

    Delivery findDeliveryById(String id);
}
