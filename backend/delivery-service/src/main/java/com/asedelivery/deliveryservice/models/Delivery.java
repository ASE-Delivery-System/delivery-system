package com.asedelivery.deliveryservice.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Document(collection = "deliveries")
public class Delivery {

    @Id
    private String id;

    @DBRef
    private Box targetBox;

    @DBRef
    private User customer;

    @DBRef
    private User deliverer;

    private EDeliveryStatus status;

    public Delivery(){}

    public Delivery(Box targetBox, User customer, User deliverer, EDeliveryStatus status) {
        this.targetBox = targetBox;
        this.customer = customer;
        this.deliverer = deliverer;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Box getTargetBox() {
        return targetBox;
    }

    public void setTargetBox(Box targetBox) {
        this.targetBox = targetBox;
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

    public EDeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(EDeliveryStatus status) {
        this.status = status;
    }
}
