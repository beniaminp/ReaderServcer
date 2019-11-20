import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {MenuController, Platform, PopoverController} from "@ionic/angular";
import {MenuEvents, MenuService} from "../ebook-reader/services/menu.service";
import {BookDTO} from "../ebook-reader/dto/BookDTO";
import {HttpParseService} from "../services/http-parse.service";
import {AppStorageService} from "../er-local-storage/app-storage.service";
import {UserDTO} from "../models/UserDTO";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {LoadingService} from "../services/loading.service";
import {BookPopoverComponent} from "./book-popover/book-popover.component";
import {SharedBookDTO} from "../ebook-reader/dto/SharedBookDTO";

declare var ePub: any;

@Component({
    selector: 'shelf-page',
    templateUrl: './shelf-page.component.html',
    styleUrls: ['./shelf-page.component.scss'],
})
export class ShelfPage implements OnInit {

    public books: BookDTO[] = [];
    public filteredBooks: BookDTO[] = [];
    public favoritesBooks: string[] = [];
    public showFavorites = false;
    public userDTO: UserDTO;
    public viewFreeBooks = false;
    public showBooks = 0;
    public showAuthors = false;

    public areSharedBooks = false;
    public sharedBooks: SharedBookDTO[];
    public connectionMap: Map<string, UserDTO>;

    private routeSub: any;

    constructor(
        private router: Router,
        public storage: Storage,
        public platform: Platform,
        public menuCtrl: MenuController,
        public menuService: MenuService,
        private route: ActivatedRoute,
        private httpParseService: HttpParseService,
        private appStorageService: AppStorageService,
        private popoverController: PopoverController,
        private loadingService: LoadingService,
        public cdr: ChangeDetectorRef) {
        this.initEventListeners();
    }

    ngOnInit() {
        this.routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.clearAll();
                this.route.params.subscribe(async params => {
                    this.enableMenu();

                    // console.error('getBooks onInit');
                    this.getBooks();
                });
            }
        });
        this.route.params.subscribe(params => {
            this.enableMenu();
            // console.error('getBooks routeParamasChanged');
            this.getBooks();
        });

        let userDTO = this.appStorageService.getUserDTO();

        this.userDTO = userDTO;
        if (userDTO.lastReadBook && userDTO.goToLastRead) {
            this.httpParseService.getBookById(userDTO.lastReadBook).subscribe(
                (books: any) => {
                    let bookDTO: BookDTO = books[0];
                    this.openBook(bookDTO);
                }
            )
        } else {
            this.getBooks();
            // console.error('getBooks onElse');
            this.enableMenu();
        }
        if (userDTO.favoritesBook != null) {
            this.favoritesBooks = userDTO.favoritesBook.split(",");
        }
    }

    public async ionViewWillEnter() {
        // console.error('ionViewWillEnter');
        await this.selectionChanged({detail: {value: this.showBooks}})
    }

    public openBook(book: BookDTO) {
        let navigationExtras: { state: { book: BookDTO } } = {
            state: {
                book
            }
        };
        this.router.navigate(['reader'], navigationExtras);
    }

    public doRefresh(event) {
        this.selectionChanged({detail: {value: this.showBooks}});
        event.target.complete();
    }

    public async presentPopover(ev) {
        const popover = await this.popoverController.create({
            component: UserSettingsComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    public searchChanged(event) {
        let searchedText = event.detail.value;
        if (searchedText.trim() == '') {
            this.filteredBooks = this.books;
        } else {
            this.filteredBooks = this.books.filter(book => book.fileName.toLowerCase().includes(searchedText.toLowerCase()));
        }
    }

    public searchInputChanged(event) {
        if (event.detail == null) {
            this.filteredBooks = this.books;
            return;
        }
        let searchedText = event.detail.data;
        if (searchedText) {
            if (searchedText.trim() == '') {
                this.filteredBooks = this.books;
            } else {
                this.filteredBooks = this.books.filter(book => book.fileName.toLowerCase().includes(searchedText.toLowerCase()));
            }
        }
    }

    public async selectionChanged(event) {
        this.showBooks = event.detail.value;
        if (this.showBooks == 0) {
            // console.error('getBooks selectionsCHanged');
            await this.getBooks();
            this.showFavorites = false;
            this.viewFreeBooks = false;
            this.showAuthors = false;
        } else if (this.showBooks == 1) {
            this.filteredBooks = this.books.filter(book => this.favoritesBooks.includes(book.objectId));
            this.showFavorites = true;
            this.viewFreeBooks = false;
            this.showAuthors = false;
        } else if (this.showBooks == 2) {
            this.showFavorites = false;
            this.viewFreeBooks = false;
            this.showAuthors = false;
            this.getSharedWithMeBooks();
        } else if (this.showBooks == 3) {
            this.showAuthors = true;
        }
    }

    public async showBookPopover(event, bookDTO: BookDTO) {
        const popover = await this.popoverController.create({
            component: BookPopoverComponent,
            componentProps: {bookDTO, userDTO: this.userDTO},
            event: event,
            translucent: true
        });
        return await popover.present();
    }

    private async deleteBookLocal(bookDTO: BookDTO) {
        this.appStorageService.deleteBook(bookDTO);
        this.books = await this.appStorageService.getBooks();
        this.filteredBooks = this.books;
    }

    private enableMenu() {
        this.menuCtrl.enable(true, 'my-books-menu');
    }

    private getBooks() {
        if (this.books != null && this.books.length > 1) {
            this.filteredBooks = this.books;
            this.areSharedBooks = false;
            this.showAuthors = false;
            return;
        }
        /* let books = await this.appStorageService.getBooks();
         if (books.length > 0) {
             this.books = books;
             this.filteredBooks = this.books;
             this.areSharedBooks = false;
             this.showAuthors = false;
             return;
         }*/
        this.loadingService.showLoader();
        this.httpParseService.getBooksForUser().subscribe(
            (res: BookDTO[]) => {
                this.books = res.sort((a, b) => a.fileName > b.fileName ? 1 : -1);
                // this.appStorageService.setBooks(this.books);
                this.filteredBooks = this.books;
                this.areSharedBooks = false;
                this.showAuthors = false;
                this.loadingService.dismissLoader();
            },
            (e) => {
                console.error(e);
                this.loadingService.dismissLoader();
            }
        );
    }

    private getSharedWithMeBooks() {
        this.loadingService.showLoader();
        this.httpParseService.getMyConnectedUsers().subscribe(
            (usersDTOs: UserDTO[]) => {
                this.connectionMap = new Map(usersDTOs.map(user => [user.objectId, user]));
                this.httpParseService.getSharedWithMeBooks().subscribe(
                    (res: SharedBookDTO[]) => {
                        this.loadingService.dismissLoader();
                        this.sharedBooks = res.sort((a, b) => a.bookDTO.fileName > b.bookDTO.fileName ? 1 : -1);
                        this.areSharedBooks = true;
                        this.showAuthors = false;
                    }, (e) => {
                        console.error(e);
                        this.loadingService.dismissLoader();
                    }
                );
            }
        );
        /*this.connectionMap = new Map(this.appStorageService.getUserConnections().map(user => [user.objectId, user]));
        this.httpParseService.getSharedWithMeBooks().subscribe(
            (res: SharedBookDTO[]) => {
                this.loadingService.dismissLoader();
                this.sharedBooks = res.sort((a, b) => a.bookDTO.fileName > b.bookDTO.fileName ? 1 : -1);
                this.areSharedBooks = true;
                this.showAuthors = false;
            }, (e) => {
                console.error(e);
                this.loadingService.dismissLoader();
            }
        );*/
    }

    public clearAll() {
        this.books = [];
        this.filteredBooks = [];
        this.favoritesBooks = [];
        this.showFavorites = false;
        this.userDTO = null;
        this.viewFreeBooks = false;
        this.areSharedBooks = false;
        this.showAuthors = false;
        this.sharedBooks = [];
    }

    private initEventListeners() {
        this.menuService.menuEmitter.subscribe(
            async (res) => {
                switch (res.type) {
                    case MenuEvents.BOOKS_ADDED: {
                        this.appStorageService.addBook(res.value);
                        this.books = await this.appStorageService.getBooks();
                        this.filteredBooks = this.books;
                        break;
                    }
                    case MenuEvents.FAVORITES_CHANGED: {
                        this.favoritesBooks = res.value;
                        break;
                    }
                    case MenuEvents.BOOK_DELETED: {
                        this.deleteBookLocal(res.value);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        )
    }
}
