package com.deloitte.security.controllers;

import com.deloitte.security.entities.User;
import com.deloitte.security.event.RegistrationCompleteEvent;
import com.deloitte.security.models.UserModel;
import com.deloitte.security.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class RegistrationController {
    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationEventPublisher publisher;
    @PostMapping("/register")
    public String registeruser(@RequestBody UserModel userModel, final HttpServletRequest request){
        User user = userService.registerUser(userModel);
        publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request)));
        return "Success";
    }
    private String applicationUrl(HttpServletRequest request) {
        return "http://"+ request.getServerName()+":"+request.getServerPort()+ request.getContextPath();
    }
}
