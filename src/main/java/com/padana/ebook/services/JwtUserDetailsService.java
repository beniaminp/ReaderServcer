package com.padana.ebook.services;

import com.padana.ebook.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(s));
        UserDTO userDTO = mongoTemplate.findOne(query, UserDTO.class);
        if (userDTO == null) {
            throw new AuthenticationCredentialsNotFoundException("User does not exists");
        }
        return userDTO;
    }
}
