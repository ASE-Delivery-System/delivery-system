package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByRfidToken(String rfidToken);

  Boolean existsByEmail(String email);

  User findUserById(String id);

  User findUserByRfidToken(String rfidToken);

  List<User> getUsersByFirstName(String firstName);

}
