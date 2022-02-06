package com.asedelivery.deliveryservice.payload.request;

import com.asedelivery.deliveryservice.models.EDeliveryStatus;

import javax.validation.constraints.NotBlank;

public class DeliveryRequest {

    @NotBlank
    private String targetBoxId;

    @NotBlank
    private String customerId;

    @NotBlank
    private String delivererId;

    private EDeliveryStatus status;

    public String getTargetBoxId() {
        return targetBoxId;
    }

    public void setTargetBoxId(String targetBoxId) {
        this.targetBoxId = targetBoxId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getDelivererId() {
        return delivererId;
    }

    public void setDelivererId(String delivererId) {
        this.delivererId = delivererId;
    }

    public EDeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(EDeliveryStatus status) {
        this.status = status;
    }
}
