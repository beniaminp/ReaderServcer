package com.padana.ebook.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

@Configuration
class MongoConfig extends AbstractMongoConfiguration {
    private String externalMongo = "mongodb+srv://beniaminp:carol1234@cluster0-clfne.mongodb.net/sublime-reader?retryWrites=true&w=majority";
    private String localMongo = "mongodb://localhost:27017/sublime-reader";

    @Override
    protected String getDatabaseName() {
        return "sublime-reader";
    }

    @Override
    public MongoClient mongoClient() {
        MongoClientURI uri = new MongoClientURI(localMongo);

        return new MongoClient(uri);
    }

    @Override
    protected String getMappingBasePackage() {
        return "com.padana";
    }
}
