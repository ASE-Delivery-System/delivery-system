package com.asedelivery.identityservice.payload.request;

import javax.validation.constraints.*;
import java.util.Set;

public class SignupRequest {


    private String id;

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRole(Set<String> roles) {
      this.roles = roles;
    }
}
