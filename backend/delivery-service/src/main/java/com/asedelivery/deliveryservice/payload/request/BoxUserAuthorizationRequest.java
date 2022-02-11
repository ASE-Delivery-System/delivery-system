package com.asedelivery.deliveryservice.payload.request;

import javax.validation.constraints.NotBlank;

public class BoxUserAuthorizationRequest {

    @NotBlank
    private String box_id;
    
    @NotBlank
    private String box_name;

    @NotBlank
    private String user_id;

    @NotBlank
    private String box_address;

    private String status_closed;

    public String getBox_id() {
        return box_id;
    }

    public void setBox_id(String box_id) {
        this.box_id = box_id;
    }

    public String getBox_name() {
        return box_name;
    }

    public void setBox_name(String box_name) {
        this.box_name = box_name;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getBox_address() {
        return box_address;
    }

    public void setBox_address(String box_address) {
        this.box_address = box_address;
    }

    public String getStatus_closed() {
        return status_closed;
    }

    public void setStatus_closed(String status_closed) {
        this.status_closed = status_closed;
    }

}
