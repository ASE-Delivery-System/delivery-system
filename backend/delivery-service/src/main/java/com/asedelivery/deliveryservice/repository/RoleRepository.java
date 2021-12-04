package com.asedelivery.deliveryservice.repository;

import com.asedelivery.deliveryservice.models.ERole;
import com.asedelivery.deliveryservice.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
