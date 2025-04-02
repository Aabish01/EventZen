package com.deloitte.security.event.listener;

import com.deloitte.security.entities.User;
import com.deloitte.security.event.RegistrationCompleteEvent;
import com.deloitte.security.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    @Autowired
    private UserService userService;

    private Logger log = LoggerFactory.getLogger(RegistrationCompleteEventListener.class);

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.saveVerificationTokenForUser(token, user);
        String url = event.getApplicationUrl() + "/verifyRegistration?token=" + token;
        log.info("URL link to verify: {}", url);
    }
}
