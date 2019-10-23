package com.padana.ebook.config.jwt;

import com.padana.ebook.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class JwtAuthenticationManager implements AuthenticationManager {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(authentication.getPrincipal()).and("password").is(authentication.getCredentials()));
        UserDTO userDTO = mongoTemplate.findOne(query, UserDTO.class);
        if (userDTO == null) {
            throw new AuthenticationCredentialsNotFoundException("User does not exists");
        }
        return authentication;
    }
}
