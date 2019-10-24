package com.padana.ebook.contorollers;

import com.padana.ebook.config.jwt.JwtPrincipal;
import com.padana.ebook.dto.BookmarkDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("bookmarks-controller")
public class BookmarksController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("getBookmarks")
    public List<BookmarkDTO> getBookmarks(@RequestParam String bookId) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()).andOperator(Criteria.where("bookId").is(bookId)));
        return mongoTemplate.find(query, BookmarkDTO.class);
    }

    @DeleteMapping("deleteBookmark/{bookmarkId}")
    public void deleteBookmark(@PathVariable String bookmarkId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("objectId").is(bookmarkId));
        mongoTemplate.remove(query, BookmarkDTO.class);
    }

    @PostMapping(value = "/addBookmark")
    public BookmarkDTO addBookmark(@RequestBody BookmarkDTO bookmarkDTO) throws Exception {
        bookmarkDTO.userId = JwtPrincipal.getUserId();
        return mongoTemplate.insert(bookmarkDTO);
    }

    @GetMapping("bookmarksCount")
    public Long bookmarksCount() {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()));
        return mongoTemplate.count(query, BookmarkDTO.class);
    }
}
