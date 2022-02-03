package tum.ase.emailservice.controller;


import com.sendgrid.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tum.ase.emailservice.payload.EmailRequest;
import tum.ase.emailservice.service.MailService;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api")
public class MailController {

    @Autowired
    MailService mailService;

    @PostMapping("/send-text")
    public String send() throws IOException {
        return mailService.sendTextEmail();
    }
    //deserialize request in to pojo

    @PostMapping("/send")
    public ResponseEntity<?> sendWithTemplate(@RequestBody EmailRequest emailrequest) throws IOException{

        if (emailrequest.getStatus() == null ||emailrequest.getStatus() =="" || emailrequest.getTo() == null || emailrequest.getTo() == ""){
            return (ResponseEntity<?>) ResponseEntity.badRequest().body("Invalid Input!");
        }


        String status = emailrequest.getStatus();
        // predefined by SendGrid API
        String from = "liudongnan.yang@tum.de";
        String to = emailrequest.getTo();
        String tempID = "";

        switch (status){
            case "newDelivery":
                tempID="d-676bf0a3c51f404780b1515307cf10b4";
                break;
            case "delivererDone" :
                tempID= "d-2dc37dcbc0b94fb590f1cdbeb1f75219";
                break;
            case "customerDone":
                tempID="d-42b39c355f7940ef9e1ce39bb88475ff";
                break;
        }

        Response response = mailService.send(from,to,tempID);
        System.out.println(response.getStatusCode()+":"+response.getBody());
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }



}
