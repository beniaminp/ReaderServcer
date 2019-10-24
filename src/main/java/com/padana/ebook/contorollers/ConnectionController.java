package com.padana.ebook.contorollers;

import com.padana.ebook.config.jwt.JwtPrincipal;
import com.padana.ebook.dto.BookDTO;
import com.padana.ebook.dto.ConnectionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("connection-controller")
public class ConnectionController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("getMyConnections")
    public List<ConnectionDTO> getMyConnections() throws Exception {
        Query query = getConnectionsQuery();
        return mongoTemplate.find(query, ConnectionDTO.class);

    }

    @PostMapping("addConnection")
    public ConnectionDTO addConnection(@RequestBody ConnectionDTO connectionDTO) {
        return mongoTemplate.insert(connectionDTO);
    }

    @GetMapping("getPendingConnections")
    public List<ConnectionDTO> getPendingConnections() throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("firstUserId").is(JwtPrincipal.getUserId()).and("secondUserAccepted").is(false));
        return mongoTemplate.find(query, ConnectionDTO.class);

    }

    @GetMapping("getReceivedConnections")
    public List<ConnectionDTO> getReceivedConnections() throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("secondUserId").is(JwtPrincipal.getUserId()).and("secondUserAccepted").is(false));
        return mongoTemplate.find(query, ConnectionDTO.class);
    }

    @PutMapping(value = "acceptConnection/{connectionId}")
    public void acceptConnection(@PathVariable String connectionId) {
        Query query = new Query();
        Update update = new Update();
        update.set("secondUserAccepted", true);
        mongoTemplate.updateFirst(query, update, ConnectionDTO.class);
    }

    @GetMapping("connectionsCount")
    public Long connectionsCount() {
        return mongoTemplate.count(getConnectionsQuery(), ConnectionDTO.class);
    }

    private Query getConnectionsQuery() {
        Query query = new Query();
        Criteria criteria = new Criteria();
        criteria.orOperator(Criteria.where("secondUserId").is(JwtPrincipal.getUserId()), Criteria.where("firstUserId").is(JwtPrincipal.getUserId()))
                .andOperator(Criteria.where("secondUserAccepted").is(true), Criteria.where("firstUserAccepted").is(true));
        query.addCriteria(criteria);
        return query;
    }
}
