package com.asedelivery.identityservice.repository;

import com.asedelivery.identityservice.models.ERole;
import com.asedelivery.identityservice.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
