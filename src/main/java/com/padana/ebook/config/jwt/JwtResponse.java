package com.padana.ebook.config.jwt;

import com.padana.ebook.dto.UserDTO;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final UserDTO userDTO;

    public JwtResponse(String jwttoken, UserDTO userDTO) {
        this.jwttoken = jwttoken;
        this.userDTO = userDTO;
    }

    public String getJwttoken() {
        return jwttoken;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }
}