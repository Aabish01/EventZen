package com.deloitte.security.services;

import com.deloitte.security.entities.User;
import com.deloitte.security.models.UserModel;

public interface UserService {
    User registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, User user);
}
