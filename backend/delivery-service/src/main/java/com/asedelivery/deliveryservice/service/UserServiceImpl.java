package com.asedelivery.deliveryservice.service;

import com.asedelivery.deliveryservice.models.ERole;
import com.asedelivery.deliveryservice.models.Role;
import com.asedelivery.deliveryservice.models.User;
import com.asedelivery.deliveryservice.repository.RoleRepository;
import com.asedelivery.deliveryservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findCustomers() {
        
        Set<Role> roles = new HashSet<>();
        Role customerRole = roleRepository.findByName(ERole.ROLE_CUSTOMER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(customerRole);

        User newUser = new User();
        newUser.setRoles(roles);

        return userRepository.findAll(Example.of(newUser));
    }

    @Override
    public List<User> findDeliverers() {

        Set<Role> roles = new HashSet<>();
        Role delivererRole = roleRepository.findByName(ERole.ROLE_DELIVERER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(delivererRole);

        User newUser = new User();
        newUser.setRoles(roles);

        return userRepository.findAll(Example.of(newUser));
    }

    @Override
    public List<User> findDispatchers() {

        Set<Role> roles = new HashSet<>();
        Role dispatcherRole = roleRepository.findByName(ERole.ROLE_DISPATCHER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(dispatcherRole);

        User newUser = new User();
        newUser.setRoles(roles);

        return userRepository.findAll(Example.of(newUser));
    }

    @Override
    public User findUserById(String id) {
        return userRepository.findUserById(id);
    }

    @Override
    public User findUserByRfidToken(String id) {
        return userRepository.findUserByRfidToken(id);
    }

    @Override
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(String id, User user) {
        User userTobeUpdated = findUserById(id);
        userTobeUpdated.setFirstName(user.getFirstName());
        userTobeUpdated.setLastName(user.getLastName());
        userTobeUpdated.setAddress(user.getAddress());
        userTobeUpdated.setRfidToken(user.getRfidToken());
        userTobeUpdated.setRoles(user.getRoles());
        userTobeUpdated.setUsername(user.getUsername());
        userTobeUpdated.setEmail(user.getEmail());
        return userRepository.save(userTobeUpdated);
    }

    @Override
    public List<User> findUsersByFirstName(String firstName) {
        System.out.println(firstName);
        return userRepository.getUsersByFirstName(firstName);
    }
}
