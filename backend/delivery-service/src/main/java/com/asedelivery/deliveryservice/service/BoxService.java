package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.Box;

import java.util.List;

public interface BoxService {

    List<Box> findAllBoxes();
    Box findBoxById(String id);
    void deleteBoxById(String id);
    Box updateBox(String id, Box box);
    Box createBox(Box box);
    Boolean existsByName(String name);
}
