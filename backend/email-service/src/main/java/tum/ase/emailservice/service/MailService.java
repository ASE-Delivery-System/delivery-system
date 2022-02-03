package tum.ase.emailservice.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sendgrid.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailService {
    private static final Logger logger = LoggerFactory.getLogger(MailService.class);

    public String sendTextEmail() throws IOException{
        Email from = new Email("liudongnan.yang@tum.de");
        Email to = new Email("467619362@qq.com");
        String subject = "The subject";
        Content content = new Content("text/plain", "This is a test email");
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            logger.info(response.getBody());
            return response.getBody();
        } catch (IOException ex) {
            throw ex;
        }



    }


    public Response send(String fromAddress , String toAddress , String TempleteId) throws IOException {
        Email from = new Email(fromAddress);
        Email to = new Email(toAddress);
        Mail mail = new Mail();

        DynamicTemplatePersonalization personalization = new DynamicTemplatePersonalization();
        personalization.addTo(to);
        mail.setFrom(from);
        mail.setSubject("SUBJECT");

        personalization.addDynamicTemplateData("id", "Yang");
        mail.addPersonalization(personalization);
        mail.setTemplateId(TempleteId);
        SendGrid sg = new SendGrid("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");
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            logger.info(String.valueOf(response.getStatusCode()));
            return response;
        } catch (IOException ex) {
            throw ex;
        }
    }


    private static class DynamicTemplatePersonalization extends Personalization {

        @JsonProperty(value = "dynamic_template_data")
        private Map<String, String> dynamic_template_data;

        @JsonProperty("dynamic_template_data")
        public Map<String, String> getDynamicTemplateData() {
            if (dynamic_template_data == null) {
                return Collections.<String, String>emptyMap();
            }
            return dynamic_template_data;
        }

        public void addDynamicTemplateData(String key, String value) {
            if (dynamic_template_data == null) {
                dynamic_template_data = new HashMap<String, String>();
                dynamic_template_data.put(key, value);
            } else {
                dynamic_template_data.put(key, value);
            }
        }

    }




}
