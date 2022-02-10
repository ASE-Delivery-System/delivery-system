package com.asedelivery.deliveryservice.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdviceHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAnyException(Exception e){
        return new ResponseEntity<>("Something went wrong! " +e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
