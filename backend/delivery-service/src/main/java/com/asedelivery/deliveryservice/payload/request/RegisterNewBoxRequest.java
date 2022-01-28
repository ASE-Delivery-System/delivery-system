package com.asedelivery.deliveryservice.payload.request;

import com.asedelivery.deliveryservice.models.EBoxStatus;
import org.springframework.data.mongodb.core.index.Indexed;

import javax.validation.constraints.NotBlank;


public class RegisterNewBoxRequest {

    @Indexed(unique = true)
    @NotBlank
    private String name;

    @NotBlank
    private EBoxStatus status;

    @NotBlank
    private String address;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public EBoxStatus getStatus() {
        return status;
    }

    public void setStatus(EBoxStatus status) {
        this.status = status;
    }

}
