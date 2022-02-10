package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.User;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    List<User> findCustomers();
    List<User> findDeliverers();
    List<User> findDispatchers();
    User findUserById(String id);
    User findUserByRfidToken(String id);
    void deleteUserById(String id);
    User updateUser(String id, User user);
    List<User> findUsersByFirstName(String firstName);
}
