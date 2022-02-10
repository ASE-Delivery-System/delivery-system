package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.Box;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoxRepository extends MongoRepository<Box, String> {
    Box findBoxById(String id);
    Boolean existsByName(String email);

    @Query("{'status' : ?0 }")
    List<Box> findEmptyBoxes(@Param("status") String status);
}
