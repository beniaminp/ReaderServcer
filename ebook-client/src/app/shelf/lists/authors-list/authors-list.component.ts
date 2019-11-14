import {Component, Input, OnInit} from '@angular/core';
import {BookDTO} from "../../../ebook-reader/dto/BookDTO";
import {HttpParseService} from "../../../services/http-parse.service";

declare var ePub: any;

@Component({
    selector: 'app-authors-list',
    templateUrl: './authors-list.component.html',
    styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {
    @Input()
    public books: BookDTO[];

    public book: any = ePub();

    constructor(private httpParseService: HttpParseService) {
    }

    ngOnInit() {
        this.init();
    }

    public init() {
        this.books.forEach(book => {
            this.httpParseService.getBookContent(book.fileUrl).subscribe(
                (bookContent) => {
                    this.book.open(bookContent);
                    console.error('this.book', this.book);
                }
            );
        })
    }

}
