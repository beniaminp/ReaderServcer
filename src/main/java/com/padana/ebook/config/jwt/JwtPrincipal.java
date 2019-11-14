package com.padana.ebook.config.jwt;

import com.padana.ebook.dto.UserDTO;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;

public class JwtPrincipal {
    public static UserDTO getUser(final Principal principal) {
        if (principal instanceof UsernamePasswordAuthenticationToken) {
            final UsernamePasswordAuthenticationToken upat = (UsernamePasswordAuthenticationToken) principal;
            return (UserDTO) upat.getPrincipal();
        } else {
            return (UserDTO) principal;
        }
    }

    public static boolean isAuthenticated() {
        return true;
    }

    public static UserDTO getUser() {
        if (SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) {
            return null;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return null;
        }

        return (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static String getUserId() {
        if (getUser() == null) {
            throw new AuthenticationCredentialsNotFoundException("User not logged in");
        }
        return getUser().objectId;
    }
}
