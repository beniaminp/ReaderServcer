import {
    AfterContentInit, AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import {IonHeader, MenuController, Platform, PopoverController} from "@ionic/angular";
import {Storage} from '@ionic/storage';
import {BookDTO} from "./dto/BookDTO";
import {EBookService, EPUB_EVENT_TYPES} from "./services/e-book.service";
import {MenuService} from "./services/menu.service";
import {Router} from "@angular/router";
import {EbookPreferencesComponent} from "./ebook-preferences/ebook-preferences.component";
import {AppStorageService} from "../er-local-storage/app-storage.service";
import {LoadingService} from "../services/loading.service";
import {BookmarkDTO} from "./dto/BookmarkDTO";
import {HttpParseService} from "../services/http-parse.service";

declare var ePub: any;
declare var window: any;
declare var EPUBJS: any;

@Component({
    selector: 'app-ebook-reader',
    templateUrl: './ebook-reader.component.html',
    styleUrls: ['./ebook-reader.component.scss']
})
export class EbookReaderComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {
    @Input('ebookSource')
    public ebookSource: any;

    @Input('bookDTO')
    public bookDTO: BookDTO = new BookDTO();

    @ViewChild('toolbarHeader', {static: false})
    public toolbarHeader;

    @ViewChild('footer', {static: false})
    public footer;

    @ViewChild('mainContent', {static: false})
    public mainContent;

    public isBookmarkSet: boolean = false;
    public showHideToolbar: boolean = false;

    public book: any = ePub();
    public rendition: any;
    public bookMarks: BookmarkDTO[] = [];
    public showNavigationControl: boolean;
    public runViewCheck = 0;
    public currentPage = 0;
    public totalPageNo = 0;
    public progress: any = 0;

    constructor(public platform: Platform,
                public storage: Storage,
                public cdr: ChangeDetectorRef,
                public menuController: MenuController,
                public ebookService: EBookService,
                public menuService: MenuService,
                private router: Router,
                private popoverController: PopoverController,
                private loadingService: LoadingService,
                private httpParseService: HttpParseService,
                public appStorageService: AppStorageService) {
    }

    ngOnInit() {
        this.loadingService.showLoader();
        this.platform.resize.subscribe(
            (res) => {
                this.resizeBook();
            }
        );
    }

    ngAfterViewInit(): void {
    }

    ngAfterContentInit(): void {
    }

    ngAfterViewChecked(): void {
        if (this.runViewCheck == 2) {
            this.initBook();
            this.initEventListeners();
        }
        this.runViewCheck += 1;
    }

    private initBook() {
        if (this.ebookSource == null) {
            alert('No ebook selected');
        }

        this.httpParseService.getBookContent(this.bookDTO.fileUrl).subscribe(
            (bookContent) => {
                this.renderBookContent(bookContent);
            }
        );
    }

    private initAnimation() {
        /*this.rendition.hooks.content.register((contents, view) => {
                console.error('contents', contents);
                return contents.addSt("test-red")
                    .then(function () {
                        // init code
                    });
            }
        );*/
    }

    private renderBookContent(bookContent) {
        this.book.open(bookContent/*, {storage: true, store: 'epubs-store'}*/);

        this.rendition = this.book.renderTo("book", {
            manager: "continuous",
            flow: "paginated",
            width: '100%',
            height: this.platform.height() - this.footer.nativeElement.offsetHeight,
            spread: 'always',
            resizeOnOrientationChange: true,
            snap: true
        });
        this.initThemes();

        this.bookReady();

        this.rendition.display();

        this.getBookmarksList();

        this.initAnimation();
    }

    private getBookmarksList() {
        this.httpParseService.getBookmarks(this.bookDTO).subscribe(
            (bookmarksDTOList: any) => {
                this.bookMarks = bookmarksDTOList;
                this.ebookService.ePubEmitter.next({type: EPUB_EVENT_TYPES.BOOKMARKS_LOADED, value: this.bookMarks});
            },
            error => console.error(error)
        )
    }

    private bookReady() {
        this.book.ready.then(() => {
            this.loadingService.dismissLoader();

            // this.setupBookStorage();

            this.ebookService.eBookEmitter.next(this.bookDTO);
            this.ebookService.ePubEmitter.next({type: EPUB_EVENT_TYPES.EPUB, value: this.book});
            this.book.locations.generate(1600);

            let userDTO = this.appStorageService.getUserDTO();

            this.setFontSize(userDTO.fontSize);
            this.setTextColor(userDTO.textColor);
            this.setBackgroundColor(userDTO.backgroundColor);
            this.setTextBold(userDTO.isBold);
            this.setTextItalic(userDTO.isItalic);
            this.setNavigationControl(userDTO.showNavigationControl);
            this.setTheme(userDTO.theme != null ? userDTO.theme : 'light');

            this.swipeToChanged();

            this.setPages();

            if (this.bookDTO.lastReadCfi != null) {
                this.book.rendition.display(this.bookDTO.lastReadCfi);
                this.cdr.detectChanges();
            }

            this.setupPageUpdate();


        }).catch(e => this.loadingService.dismissLoader());
    }

    private setupPageUpdate() {
        this.rendition.on('relocated', (locations) => {
            let progress = this.book.locations.percentageFromCfi(locations.start.cfi);
            this.progress = Number(progress * 100).toFixed(1);
            this.currentPage = this.book.locations.locationFromCfi(locations.start.cfi);
            this.totalPageNo = this.book.locations.total;
            this.cdr.detectChanges();
        });
    }

    public setPages() {
        this.currentPage = this.book.locations.currentLocation;
        this.totalPageNo = this.book.locations.total;
        this.cdr.detectChanges();
    }

    private swipeToChanged() {
        this.rendition.hooks.content.register((contents) => {
                const el = contents.document.documentElement;
                if (el) {

                    //Enable swipe gesture to flip a page
                    let start: Touch;
                    let end: Touch;

                    el.addEventListener('touchstart', (event: TouchEvent) => {
                        start = event.changedTouches[0];
                    });

                    el.addEventListener('touchend', (event: TouchEvent) => {
                        end = event.changedTouches[0];
                        const elBook = document.querySelector('main'); //Parent div, which contains the #area div
                        if (elBook) {
                            const bound = elBook.getBoundingClientRect();
                            const hr = (end.screenX - start.screenX) / bound.width;
                            const vr = Math.abs((end.screenY - start.screenY) / bound.height);
                            if (hr > 0.25 && vr < 0.1) {
                                this.move(0);
                            }

                            if (hr < -0.25 && vr < 0.1) {
                                this.move(1);
                            }
                        }
                    });
                }
            }
        );
    }

    private setupBookStorage() {
        this.book.storage.on("online", () => {
            console.log("online");
        });
        this.book.storage.on("offline", () => {
            console.log("offline");
        });
    }

    public goBack() {
        this.router.navigate(['shelf']);
    }

    public move(where) {
        this.showHideToolbar = false;
        if (where == 0) {
            this.rendition.prev().then(() => {
                this.setUnsetBookmarkIcon();
                this.setLastPage();
                this.cdr.detectChanges();
            });
        } else {
            this.rendition.next().then(() => {
                this.setUnsetBookmarkIcon();
                this.setLastPage();
                this.cdr.detectChanges();
            });
        }
    }

    public setLastPage() {
        var cfi = this.ebookService.getStartCfi(this.book);
        this.bookDTO.lastReadCfi = cfi;
        this.httpParseService.updateLastCfi(this.bookDTO.objectId, cfi).subscribe();
    }

    public setUnsetBookmark() {
        var cfi = this.ebookService.getStartCfi(this.book);

        if (!this.bookmarkExists()) {
            this.isBookmarkSet = true;
            let bookMarkDTO: BookmarkDTO = new BookmarkDTO();
            bookMarkDTO.cfi = cfi;
            bookMarkDTO.isDeleted = false;
            bookMarkDTO.bookId = this.bookDTO.objectId;
            bookMarkDTO.percentage = this.ebookService.getPagePercentByCfi(this.book, cfi);
            this.httpParseService.addBookmark(bookMarkDTO).subscribe(
                (res: any) => {
                    bookMarkDTO.objectId = res.objectId;
                    this.bookMarks.push(bookMarkDTO);
                    this.ebookService.ePubEmitter.next({
                        type: EPUB_EVENT_TYPES.BOOKMARKS_LOADED,
                        value: this.bookMarks
                    });
                }
            );
        } else {
            let indexOfBookmark = this.bookMarks.findIndex(bookMarkDTO => bookMarkDTO.cfi == cfi);
            let bookMarkToDelete = this.bookMarks[indexOfBookmark];
            this.bookMarks.splice(indexOfBookmark, 1);
            this.ebookService.ePubEmitter.next({type: EPUB_EVENT_TYPES.BOOKMARKS_LOADED, value: this.bookMarks});
            this.isBookmarkSet = false;

            this.httpParseService.deleteBookMark(bookMarkToDelete).subscribe();
        }
        this.cdr.detectChanges();
    }

    public showHideToolbarClick() {
        this.showHideToolbar = !this.showHideToolbar;
        // this.resizeBook();
    }

    public async presentPopover(ev) {
        const popover = await this.popoverController.create({
            component: EbookPreferencesComponent,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    private bookmarkExists() {
        let cfi = this.rendition.currentLocation().start.cfi;

        if (this.bookMarks.filter(bookMarksDTO => bookMarksDTO.cfi == cfi).length > 0) {
            return true;
        }
        return false;
    }

    private setUnsetBookmarkIcon() {
        this.isBookmarkSet = false;
        if (this.bookmarkExists()) {
            this.isBookmarkSet = true;
        }
    }

    private setFontSize(fontSize) {
        this.rendition.themes.fontSize(fontSize + '%');
    }

    private setTextColor(textColor) {
        this.rendition.themes.override('color', textColor, true);
    }

    private setBackgroundColor(backgroundColor) {
        this.rendition.themes.override('background-color', backgroundColor, true);
    }

    private setTextBold(isBold: boolean) {
        this.rendition.themes.override('font-weight', isBold ? 'bold' : 'normal', true);
    }

    private setTextItalic(isItalic: boolean) {
        this.rendition.themes.override('font-style', isItalic ? 'italic' : 'normal', true);
    }

    private setNavigationControl(showNavigationControl) {
        this.showNavigationControl = showNavigationControl;
    }

    private setTheme(value: string) {
        this.rendition.themes.select(value);
    }

    private resizeBook() {
        let platformHeight = this.platform.height();
        let footerHeight = this.footer.nativeElement.offsetHeight;
        // console.error('footerHeight', footerHeight);

        if (this.rendition != null) {
            this.rendition.resize(this.platform.width(), platformHeight - footerHeight);
            this.setupPageUpdate();
        }

        /*this.book.generatePagination().then(() => {
            console.error('this.book.pagination', this.book.pagination);
            console.error('book.pagination.pageFromCfi(book.getCurrentLocationCfi());', this.book.pagination.pageFromCfi(this.book.getCurrentLocationCfi()))
        })*/
    }

    private initThemes() {
        this.rendition.themes.register("dark", "assets/themes.css");
        this.rendition.themes.register("light", "assets/themes.css");
        this.rendition.themes.register("tan", "assets/themes.css");
    }

    private initEventListeners() {
        this.ebookService.emitEpub(this.book);
        this.ebookService.ePubEmitter.subscribe(
            (event) => {
                switch (event.type) {
                    case EPUB_EVENT_TYPES.GO_TO_BOOKMARK: {
                        this.book.rendition.display(event.value);
                        this.menuController.toggle();
                        this.cdr.detectChanges();
                        break;
                    }
                    case EPUB_EVENT_TYPES.FONT_SIZE_CHANGED: {
                        this.httpParseService.updateFontSize(event.value).subscribe(
                            (res) => {
                                this.setFontSize(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.TEXT_COLOR_CHANGED: {
                        this.httpParseService.updateTextColor(event.value).subscribe(
                            (res) => {
                                this.setTextColor(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.BACKGROUND_COLOR_CHANGED: {
                        this.httpParseService.updateBackgroundColor(event.value).subscribe(
                            (res) => {
                                this.setBackgroundColor(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.TEXT_BOLD_CHANGED: {
                        this.httpParseService.updateTextBold(event.value).subscribe(
                            (res) => {
                                this.setTextBold(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.TEXT_ITALIC_CHANGED: {
                        this.httpParseService.updateTextItalic(event.value).subscribe(
                            (res) => {
                                this.setTextItalic(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.NAVIGATION_CONTROL_CHANGED: {
                        this.httpParseService.updateNavigationControl(event.value).subscribe(
                            (res) => {
                                this.setNavigationControl(event.value);
                            }
                        );
                        break;
                    }
                    case EPUB_EVENT_TYPES.THEME_CHANGED: {
                        this.httpParseService.updateTheme(event.value).subscribe(
                            (res) => {
                                this.setTheme(event.value);
                            }
                        );
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        );
        this.menuService.menuEmitter.subscribe(
            (event) => {
                if (event == 0) {
                    this.cdr.detectChanges();
                }
            }
        )
    }

    // search in chapter book.currentChapter.find("Some Text to look for");
    // page number from cfi book.pagination.pageFromCfi(cfiGoesHere);
    onSwipeLeft(event) {
        console.error(event);
    }

}
