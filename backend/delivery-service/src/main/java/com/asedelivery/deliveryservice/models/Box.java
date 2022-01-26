package com.asedelivery.deliveryservice.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "boxes")
public class Box {
    @Id
    private String id;
    private String name;

    @NotBlank
    private EBoxStatus status;

    @NotBlank//address of the box
    private String address;

    @DBRef
    private User customer;

    @DBRef
    private User deliverer;

    public Box() {
    }

    public Box(String id, String name, String address, EBoxStatus status, User customer, User deliverer) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.status = status;
        this.customer = customer;
        this.deliverer = deliverer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public EBoxStatus getStatus() { return status; }

    public void setStatus(EBoxStatus status) {
        this.status = status;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getDeliverer() {
        return deliverer;
    }

    public void setDeliverer(User deliverer) {
        this.deliverer = deliverer;
    }

}
