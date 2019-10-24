package com.padana.ebook.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("bookmark")
public class BookmarkDTO {

    @Id
    public String objectId;

    public String bookId;
    public String userId;
    public String cfi;
    public Long date;
    public String percentage;
    public Long page;
}
