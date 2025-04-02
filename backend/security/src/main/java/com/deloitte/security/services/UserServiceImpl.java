package com.deloitte.security.services;

import com.deloitte.security.entities.User;
import com.deloitte.security.entities.VerificationToken;
import com.deloitte.security.models.UserModel;
import com.deloitte.security.repositories.UserRepository;
import com.deloitte.security.repositories.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements  UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public User registerUser(UserModel userModel) {
        // TODO Auto-generated method stub
        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(userModel.getPassword()));

        userRepository.save(user);
        return user;
    }
    @Override
    public void saveVerificationTokenForUser(String token, User user) {
        // TODO Auto-generated method stub\
        VerificationToken verificationToken = new VerificationToken(token,user);
        verificationTokenRepository.save(verificationToken);
    }
}
