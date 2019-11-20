import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {BookDTO} from "../../ebook-reader/dto/BookDTO";
import {HttpParseService} from "../../services/http-parse.service";
import {PeopleComponent} from "../../social/people/people.component";
import {PendingConnectionsComponent} from "../../social/pending-connections/pending-connections.component";
import {UploadService} from "../../services/upload.service";
import {MyConnectionsComponent} from "../../social/my-connections/my-connections.component";
import {UserDTO} from "../../models/UserDTO";

declare var ePub: any;

@Component({
    selector: 'app-my-books-menu',
    templateUrl: './my-books-menu.component.html',
    styleUrls: ['./my-books-menu.component.scss']
})
export class MyBooksMenuComponent implements OnInit {
    public filesArray = [];
    public options;

    constructor(public storage: Storage,
                public httpParseService: HttpParseService,
                public alertController: AlertController,
                public modalController: ModalController,
                private uploadService: UploadService) {

    }

    onUploadOutput(output): void {
        if (output.type == 'allAddedToQueue') {
            this.httpParseService.getBooksForUser().subscribe(
                (bookDTO: BookDTO[]) => {
                    this.filesArray.forEach(file => {
                        let foundedBook = this.bookExists(bookDTO, file.name);
                        if (foundedBook.length != 0) {
                            this.presentAlert(file.name).then();
                        } else {
                            this.uploadService.readFile(file);
                            this.filesArray.splice(this.filesArray.indexOf(file), 1);
                        }
                    });
                }
            );
        }
        if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            this.filesArray.push(output.file.nativeFile);
        }
    }

    private bookExists(bookDTO: BookDTO[], fileName) {
        let foundedBook = bookDTO.filter(bookDTO => bookDTO.fileName.toLowerCase() == fileName.toLowerCase());
        return foundedBook;
    }

    async presentAlert(bookTitle) {
        const alert = await this.alertController.create({
            header: 'Book exists',
            message: 'This is book is already added ' + bookTitle,
            buttons: ['OK']
        });

        await alert.present();
    }

    ngOnInit() {
        this.options = {allowedContentTypes: ['application/epub+zip']}
    }

    public async openPeople() {
        try {
            const modal = await this.modalController.create({
                component: PeopleComponent,
                componentProps: {},
                showBackdrop: true,
                backdropDismiss: true
            });
            modal.present();
            const {data} = await modal.onWillDismiss();
        } catch (e) {
            console.error(e);
        }
    }

    public async openPendingInvites() {
        try {
            this.httpParseService.getReceivedConnections().subscribe(
                (connections: any) => {
                    let receivedConnections = connections == null ? [] : connections;
                    let usersIdArray = [];

                    receivedConnections.forEach(connection => {
                        usersIdArray.push(connection.firstUserId);
                    });
                    let usersMap: Map<string, UserDTO> = new Map();
                    this.httpParseService.getUsersByIds(usersIdArray).subscribe(
                        async (usersDTO: UserDTO[]) => {
                            usersDTO.forEach(userDTO => usersMap.set(userDTO.objectId, userDTO));

                            const modal = await this.modalController.create({
                                component: PendingConnectionsComponent,
                                componentProps: {'receivedConnections': receivedConnections, 'usersMap': usersMap},
                                showBackdrop: true,
                                backdropDismiss: true
                            });
                            modal.present();
                            const {data} = await modal.onWillDismiss();
                        }
                    ), e1 => console.error(e1)
                }, e => console.error(e)
            )
        } catch (e) {
            console.error(e);
        }
    }

    public async openMyConnections() {
        try {
            this.httpParseService.getMyConnectedUsers().subscribe(
                async (conns: UserDTO[]) => {
                    let connections = conns;
                    const modal = await this.modalController.create({
                        component: MyConnectionsComponent,
                        componentProps: {'myConnections': connections},
                        showBackdrop: true,
                        backdropDismiss: true
                    });
                    modal.present();
                    const {data} = await modal.onWillDismiss();
                }
            );
        } catch (e) {
            console.error(e);
        }
    }
}
