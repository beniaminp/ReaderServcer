package com.padana.ebook.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("shared-books")
public class SharedBooksDTO {
    @Id
    public String objectId;

    public String fromUser;

    public String toUser;

    public String bookId;

    public String daysToShare;

    public Long startDate;
}
