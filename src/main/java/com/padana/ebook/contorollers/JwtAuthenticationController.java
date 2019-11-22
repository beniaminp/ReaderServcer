package com.padana.ebook.contorollers;

import com.padana.ebook.config.jwt.JwtAuthenticationManager;
import com.padana.ebook.config.jwt.JwtRequest;
import com.padana.ebook.config.jwt.JwtResponse;
import com.padana.ebook.config.jwt.JwtTokenUtil;
import com.padana.ebook.dto.UserDTO;
import com.padana.ebook.services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jwt-controller")
public class JwtAuthenticationController {

    @Autowired
    private JwtAuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(authenticationRequest.getUsername()).and("password").is(authenticationRequest.getPassword()));
        UserDTO userDTO = mongoTemplate.findOne(query, UserDTO.class);

        return ResponseEntity.ok(new JwtResponse(token, userDTO));
    }

    @PostMapping("/socialAuthenticate/{socialMethod}")
    public ResponseEntity<?> socialAuthenticate(@PathVariable Long socialMethod, @RequestBody UserDTO userDTO) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(userDTO.email));

        if (socialMethod == 1) {
            query.addCriteria(Criteria.where("googleId").is(userDTO.googleId));
            UserDTO foundUser = mongoTemplate.findOne(query, UserDTO.class);
            if (foundUser != null) {
                authenticate(foundUser.getUsername(), foundUser.googleId);
                final UserDetails userDetails = userDetailsService
                        .loadUserByUsername(foundUser.getUsername());
                final String token = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token, foundUser));
            } else {
                query = new Query();
                query.addCriteria(Criteria.where("email").is(userDTO.email));
                UserDTO foundUserByEmail = mongoTemplate.findOne(query, UserDTO.class);
                if (foundUserByEmail != null) {
                    Update update = new Update();
                    update.set("googleId", userDTO.googleId);
                    mongoTemplate.updateFirst(query, update, UserDTO.class);
                    authenticate(userDTO.getUsername(), userDTO.getPassword());
                    final UserDetails userDetails = userDetailsService
                            .loadUserByUsername(userDTO.getUsername());
                    final String token = jwtTokenUtil.generateToken(userDetails);
                    return ResponseEntity.ok(new JwtResponse(token, userDTO));
                }
            }
        }
        mongoTemplate.insert(userDTO);
        authenticate(userDTO.getUsername(), userDTO.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userDTO.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, userDTO));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) throws Exception {
        userDTO = mongoTemplate.insert(userDTO);
        authenticate(userDTO.getUsername(), userDTO.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userDTO.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, userDTO));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
