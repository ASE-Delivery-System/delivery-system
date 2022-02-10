package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.payload.request.UpdateUserRequest;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    List<User> findCustomers();
    List<User> findDeliverers();
    List<User> findDispatchers();
    User findUserById(String id);
    User findUserByRfidToken(String id);
    void deleteUserById(String id);
    User updateUser(String id, UpdateUserRequest user);
    List<User> findUsersByFirstName(String firstName);
}
