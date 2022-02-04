package com.asedelivery.deliveryservice;

import com.asedelivery.deliveryservice.controllers.*;
import com.asedelivery.deliveryservice.security.jwt.AuthEntryPointJwt;
import com.asedelivery.deliveryservice.security.jwt.JwtUtils;
import com.asedelivery.deliveryservice.security.services.UserDetailsServiceImpl;
import com.asedelivery.deliveryservice.service.BoxService;
import com.asedelivery.deliveryservice.service.DeliveryService;
import com.asedelivery.deliveryservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class ComponentUnitTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    public void givenInScopeComponents_whenSearchingInApplicationContext_thenFindThem() {
        assertNotNull(applicationContext.getBean(BoxService.class));
        assertNotNull(applicationContext.getBean(DeliveryService.class));
        assertNotNull(applicationContext.getBean(UserService.class));
        assertNotNull(applicationContext.getBean(BoxController.class));
        assertNotNull(applicationContext.getBean(CustomerController.class));
        assertNotNull(applicationContext.getBean(DeliveryController.class));
        assertNotNull(applicationContext.getBean(RegisterUserController.class));
        assertNotNull(applicationContext.getBean(UserController.class));

        assertNotNull(applicationContext.getBean(AuthEntryPointJwt.class));
        assertNotNull(applicationContext.getBean(UserDetailsServiceImpl.class));
        assertNotNull(applicationContext.getBean(JwtUtils.class));

    }

    @Test
    public void givenRestTemplateBeanComponent_whenSearchingInApplicationContext_thenFindIt() {
        assertNotNull(applicationContext.getBean(RestTemplate.class));
    }
}