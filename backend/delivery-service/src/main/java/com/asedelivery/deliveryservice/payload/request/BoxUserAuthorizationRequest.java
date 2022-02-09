import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.EDeliveryStatus;
import com.asedelivery.deliveryservice.models.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

package com.asedelivery.deliveryservice.payload.request;

import com.asedelivery.deliveryservice.models.Box;
import com.asedelivery.deliveryservice.models.EDeliveryStatus;
import com.asedelivery.deliveryservice.models.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class BoxUserAuthorizationRequest {

    @NotBlank
    private String box_id;

    @NotBlank
    private String box_name;

    @NotBlank
    private String user_id;

    @NotBlank
    private String box_address;

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
}
