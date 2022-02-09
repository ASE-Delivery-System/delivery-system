package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.EBoxStatus;
import com.asedelivery.deliveryservice.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoxServiceImpl implements BoxService{

    @Autowired
    BoxRepository boxRepository;

    @Override
    public List<Box> findAllBoxes() {
        return boxRepository.findAll();
    }

    @Override
    public Box findBoxById(String id) {
        return boxRepository.findBoxById(id);
    }

    @Override
    public void deleteBoxById(String id) {
        boxRepository.deleteById(id);
    }

    @Override
    public Box updateBox(String id, Box box) {
        Box boxTobeUpdated = findBoxById(id);
        boxTobeUpdated.setName(box.getName());
        boxTobeUpdated.setAddress(box.getAddress());
        boxTobeUpdated.setStatus(box.getStatus());
        boxTobeUpdated.setCustomer(box.getCustomer());
        boxTobeUpdated.setDeliverer(box.getDeliverer());
        boxTobeUpdated.setDeliveries(box.getDeliveries());
        return boxRepository.save(boxTobeUpdated);
    }

    @Override
    public Box createBox(Box box) {
        return boxRepository.save(box);
    }

    @Override
    public Boolean existsByName(String name) {
        return boxRepository.existsByName(name);
    }

    @Override
    public Box updateBoxStatus(String id, EBoxStatus status) {

        Box boxStatusToBeUpdated = boxRepository.findBoxById(id);
        boxStatusToBeUpdated.setStatus(status);
        return boxRepository.save(boxStatusToBeUpdated);
    }

}
