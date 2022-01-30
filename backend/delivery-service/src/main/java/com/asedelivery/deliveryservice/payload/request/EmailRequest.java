package com.asedelivery.deliveryservice.payload.request;

import javax.validation.constraints.NotBlank;

public class EmailRequest {

    @NotBlank
    private String to;

    @NotBlank
    private String status;

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
