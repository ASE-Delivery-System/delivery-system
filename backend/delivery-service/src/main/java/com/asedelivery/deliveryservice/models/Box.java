package com.asedelivery.deliveryservice.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Document(collection = "boxes")
public class Box {
    @Id
    private String id;

    @Indexed(unique=true)
    @NotBlank
    private String name;

    @NotBlank
    private EBoxStatus status;

    @NotBlank
    private String address;

    @DBRef
    private User customer;

    @DBRef
    private User deliverer;

    private List<Delivery> deliveries;

    public Box() {
    }

    public Box(String name, String address, EBoxStatus status) {
        this.name = name;
        this.address = address;
        this.status = status;
    }

    public Box(String name, String address, EBoxStatus status, User customer, User deliverer, List<Delivery> deliveries) {
        this.name = name;
        this.address = address;
        this.status = status;
        this.customer = customer;
        this.deliverer = deliverer;
        this.deliveries = deliveries;
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

    public List<Delivery> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<Delivery> deliveries) {
        this.deliveries = deliveries;
    }
}
