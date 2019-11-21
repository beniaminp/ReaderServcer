import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from "@ionic/angular";
import {BookDTO} from "../../ebook-reader/dto/BookDTO";
import {ConnectionDTO} from "../../models/ConnectionDTO";
import {UserDTO} from "../../models/UserDTO";
import {AppStorageService} from "../../er-local-storage/app-storage.service";
import {HttpParseService} from "../../services/http-parse.service";

@Component({
    selector: 'app-share-book',
    templateUrl: './share-book.component.html',
    styleUrls: ['./share-book.component.scss'],
})
export class ShareBookComponent implements OnInit {
    private bookDTO: BookDTO;
    public connections: UserDTO[];
    public isOkToRender = false;
    public userDTO: UserDTO;

    constructor(public modalController: ModalController,
                private navParams: NavParams,
                public appStorageService: AppStorageService,
                public httpParseService: HttpParseService,
                public toastController: ToastController) {
    }

    ngOnInit() {
        this.connections = this.navParams.get('myConnections');
        this.isOkToRender = true;
        /*this.connections = this.appStorageService.getUserConnections();
        this.isOkToRender = true;*/
    }

    public dismissModal() {
        this.modalController.dismiss();
    }

    public async shareWithUser(user: UserDTO) {
        let toastSharedBook = await this.toastController.create({
            message: 'Book ' + this.bookDTO.fileName + ' shared with ' + user.username + ' for 10 days.',
            duration: 2000
        });
        this.httpParseService.shareWithUser(user, this.bookDTO).subscribe(
            (res) => {
                toastSharedBook.present();
            }, (e) => console.error(e)
        );
    }
}
