package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.Box;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BoxRepository extends MongoRepository<Box, String> {
    Box findBoxById(String id);
    Boolean existsByName(String email);
}
