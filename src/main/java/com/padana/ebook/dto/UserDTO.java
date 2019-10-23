package com.padana.ebook.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Document("user")
public class UserDTO implements UserDetails {
    @Id
    public String objectId;

    public String username;
    public String email;
    public String password;
    public String sessionToken;
    public String lastReadBook;
    public String favoritesBook;
    public Boolean goToLastRead;
    public String fontSize;
    public String textColor;
    public String backgroundColor;
    public Boolean isBold;
    public Boolean isItalic;
    public Boolean showNavigationControl;
    public String theme;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
