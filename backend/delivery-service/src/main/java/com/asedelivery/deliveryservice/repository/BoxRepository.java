package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.Box;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {
}

