package com.padana.ebook.scheduler;

import com.padana.ebook.dto.SharedBooksDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class SchedulerTaks {
    private static final Logger log = LoggerFactory.getLogger(SchedulerTaks.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    @Scheduled(fixedRate = 10000)
    public void checkSharedBooks() {
        List<SharedBooksDTO> sharedBooksDTOList = mongoTemplate.find(new Query(), SharedBooksDTO.class);
        sharedBooksDTOList.parallelStream().forEach(sharedBooksDTO -> {
            long daysToShareMillis = TimeUnit.MILLISECONDS.convert(Long.parseLong(sharedBooksDTO.daysToShare), TimeUnit.DAYS);
            if (sharedBooksDTO.startDate != null) {
                if (daysToShareMillis + sharedBooksDTO.startDate < System.currentTimeMillis()) {
                    Update update = new Update();
                    update.set("expired", true);
                    Query query = new Query();
                    query.addCriteria(Criteria.where("objectId").in(sharedBooksDTO.objectId));
                    mongoTemplate.updateFirst(query, update, SharedBooksDTO.class);
                }
            }
        });
    }
}
