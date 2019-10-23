package com.padana.ebook.config;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;

@Configuration
class MongoConfig extends AbstractMongoConfiguration {

    @Override
    protected String getDatabaseName() {
        return "sublime-reader";
    }

    @Override
    public MongoClient mongoClient() {
        MongoClientURI uri = new MongoClientURI(
                "mongodb+srv://beniaminp:carol1234@cluster0-clfne.mongodb.net/sublime-reader?retryWrites=true&w=majority");

        return new MongoClient(uri);
    }

    @Override
    protected String getMappingBasePackage() {
        return "com.padana";
    }
}
