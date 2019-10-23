package com.padana.ebook.contorollers;

import com.padana.ebook.config.jwt.JwtPrincipal;
import com.padana.ebook.dto.ConnectionDTO;
import com.padana.ebook.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("user-controller")
public class UserController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("login")
    public UserDTO login(String username, String password) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(username).and("password").is(password));
        UserDTO userDTO = mongoTemplate.findOne(query, UserDTO.class);
        if (userDTO == null) {
            throw new Exception("User does not exists");
        }
        return userDTO;
    }

    @PostMapping("signup")
    public UserDTO signup(@RequestBody UserDTO userDTO) {
        return mongoTemplate.insert(userDTO);
    }

    @GetMapping("getUser")
    public UserDTO getUser() throws Exception {
        return JwtPrincipal.getUser();
    }

    @PostMapping("getUsersByIds")
    public List<UserDTO> getUsersByIds(@RequestBody List<String> userIds) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("objectId").in(userIds));
        return mongoTemplate.find(query, UserDTO.class);
    }

    // start updates
    @PutMapping(value = "updateLastReadBook")
    public void updateLastReadBook(@RequestParam String lastReadBook) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("lastReadBook", lastReadBook);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateFontSize")
    public void updateFontSize(@RequestParam String fontSize) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("fontSize", fontSize);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateTextColor")
    public void updateTextColor(@RequestParam String textColor) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("textColor", textColor);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateBackgroundColor")
    public void updateBackgroundColor(@RequestParam String backgroundColor) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("backgroundColor", backgroundColor);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateTextBold")
    public void updateTextBold(@RequestParam Boolean isBold) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("isBold", isBold);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateTextItalic")
    public void updateTextItalic(@RequestParam Boolean isItalic) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("isItalic", isItalic);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateNavigationControl")
    public void updateNavigationControl(@RequestParam Boolean showNavigationControl) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("showNavigationControl", showNavigationControl);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateTheme")
    public void updateTheme(@RequestParam String theme) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("theme", theme);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateFavoritesBooks")
    public void updateFavoritesBooks(@RequestBody List<String> favoriteBooks) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("favoriteBooks", favoriteBooks);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }

    @PutMapping(value = "updateOpenLastRead")
    public void updateOpenLastRead(@RequestParam Boolean goToLastRead) {
        Query query = getUserQuery();
        Update update = new Update();
        update.set("goToLastRead", goToLastRead);
        mongoTemplate.updateFirst(query, update, UserDTO.class);
    }
    // end updates

    // start connections
    @GetMapping("getMyConnections")
    public List<UserDTO> getMyConnections() throws Exception {
        return getMyConnectedUsers();

    }

    @GetMapping("getUnconnectedUsers")
    public List<UserDTO> getUnconnectedUsers() throws Exception {
        List<String> connectedUsersAndMe = getConnectedUserIds(getUserConnections());
        connectedUsersAndMe.add(JwtPrincipal.getUserId());
        Query query = new Query(Criteria.where("objectId").nin(connectedUsersAndMe));
        return mongoTemplate.find(query, UserDTO.class);

    }
    // end connections

    private Query getUserQuery() {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(JwtPrincipal.getUserId()));
        return query;
    }

    private List<UserDTO> getMyConnectedUsers() {
        List<ConnectionDTO> connectionDTOS = getUserConnections();

        List<String> usersIds = getConnectedUserIds(connectionDTOS);

        Criteria userCriteria = Criteria.where("objectId").in(usersIds);
        Query query = new Query();
        query.addCriteria(userCriteria);
        return mongoTemplate.find(query, UserDTO.class);
    }

    private List<String> getConnectedUserIds(List<ConnectionDTO> connectionDTOS) {
        List<String> usersIds = connectionDTOS.stream().filter(connectionDTO -> connectionDTO.firstUserId != JwtPrincipal.getUserId()).map(connectionDTO -> connectionDTO.firstUserId).collect(Collectors.toList());
        usersIds.addAll(connectionDTOS.stream().filter(connectionDTO -> connectionDTO.secondUserId != JwtPrincipal.getUserId()).map(connectionDTO -> connectionDTO.secondUserId).collect(Collectors.toList()));
        return usersIds;
    }

    private List<ConnectionDTO> getUserConnections() {
        Query query = new Query();
        Criteria criteria = new Criteria();
        criteria.orOperator(Criteria.where("secondUserId").is(JwtPrincipal.getUserId()), Criteria.where("firstUserId").is(JwtPrincipal.getUserId()))
                .andOperator(Criteria.where("secondUserAccepted").is(true), Criteria.where("firstUserAccepted").is(true));
        query.addCriteria(criteria);
        return mongoTemplate.find(query, ConnectionDTO.class);
    }
}
