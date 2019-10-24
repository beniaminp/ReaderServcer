package com.padana.ebook.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("book")
public class BookDTO {

    @Id
    public String objectId;

    public String userId;
    public String title;
    public String uniqueIdentifier;
    public String fileUrl;
    // file infos
    public String fileId;
    public String fileName;
    public Object bookContent;
    public String fileUrlName;
}
