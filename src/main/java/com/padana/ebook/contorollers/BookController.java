package com.padana.ebook.contorollers;

import com.padana.ebook.config.jwt.JwtPrincipal;
import com.padana.ebook.dto.BookDTO;
import com.padana.ebook.dto.SharedBooksDTO;
import com.padana.ebook.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("book-controller")
public class BookController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping(value = "/uploadFile/{fileName}", consumes = "application/epub+zip")
    public String uploadFile(@RequestBody byte[] file, @PathVariable String fileName) throws Exception {
        fileName = fileStorageService.storeFile(file, fileName);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/book-controller/downloadFile/")
                .path(fileName)
                .toUriString();
        return fileDownloadUri;
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) throws Exception {
        // Load file as Resource
        org.springframework.core.io.Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new Exception(ex);
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("getBooks")
    public List<BookDTO> getBooks() throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()));
        return mongoTemplate.find(query, BookDTO.class);
    }

    @GetMapping("getSharedWithMeBooks")
    public List<SharedBooksDTO> getSharedWithMeBooks() throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("toUser").is(JwtPrincipal.getUserId()));
        List<SharedBooksDTO> sharedBooksDTOList = mongoTemplate.find(query, SharedBooksDTO.class);
        List<String> bookIds = sharedBooksDTOList.stream().map(sharedBooksDTO -> sharedBooksDTO.bookId).collect(toList());
        query = new Query();
        query.addCriteria(Criteria.where("objectId").in(bookIds));
        List<BookDTO> bookDTOList = mongoTemplate.find(query, BookDTO.class);
        if (sharedBooksDTOList != null && sharedBooksDTOList.size() > 0) {
            sharedBooksDTOList.forEach(sharedBooksDTO -> {
                sharedBooksDTO.bookDTO = bookDTOList.stream()
                        .filter(bookDTO -> bookDTO.objectId.equals(sharedBooksDTO.bookId)).collect(toList()).get(0);
            });
        }
        return sharedBooksDTOList;
    }

    @PostMapping(value = "/addBook")
    public BookDTO addBook(@RequestBody BookDTO bookDTO) throws Exception {
        return mongoTemplate.insert(bookDTO);
    }


    @DeleteMapping("deleteBook/{bookId}")
    public void deleteBook(@PathVariable String bookId) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("objectId").is(bookId));
        BookDTO bookDTO = mongoTemplate.findOne(query, BookDTO.class);
        fileStorageService.deleteFile(bookDTO.fileName);

        mongoTemplate.remove(bookDTO);
    }

    @GetMapping("booksCount")
    public Long booksCount() {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()));
        return mongoTemplate.count(query, BookDTO.class);
    }

    @GetMapping("getBookById")
    public BookDTO getBookById(@RequestParam String bookId) throws Exception {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()).andOperator(Criteria.where("objectId").is(bookId)));
        return mongoTemplate.findOne(query, BookDTO.class);
    }

    @PutMapping(value = "updateLastCfi/{bookId}")
    public void updateLastCfi(@PathVariable String bookId, @RequestParam String lastCfi) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(JwtPrincipal.getUserId()).andOperator(Criteria.where("objectId").is(bookId)));
        Update update = new Update();
        update.set("lastReadCfi", lastCfi);
        mongoTemplate.updateFirst(query, update, BookDTO.class);
    }
}
