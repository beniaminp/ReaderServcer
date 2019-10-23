package com.padana.ebook.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("connection")
public class ConnectionDTO {
    @Id
    public String objectId;

    public String firstUserId;
    public String secondUserId;
    public Boolean firstUserAccepted;
    public Boolean secondUserAccepted;
}
