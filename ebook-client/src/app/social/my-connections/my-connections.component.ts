import {Component, OnInit} from '@angular/core';
import {HttpParseService} from "../../services/http-parse.service";
import {ModalController, NavParams} from "@ionic/angular";
import {AppStorageService} from "../../er-local-storage/app-storage.service";
import {UserDTO} from "../../models/UserDTO";

@Component({
    selector: 'app-my-connections',
    templateUrl: './my-connections.component.html',
    styleUrls: ['./my-connections.component.scss'],
})
export class MyConnectionsComponent implements OnInit {
    public connections: UserDTO[];
    public isOkToRender = false;
    public userDTO: UserDTO;

    constructor(public httpParseService: HttpParseService,
                public modalController: ModalController,
                public appStorageService: AppStorageService,
                private navParams: NavParams) {
    }

    ngOnInit() {
        this.connections = this.navParams.get('myConnections');
        this.isOkToRender = true;
    }

    public dismissModal() {
        this.modalController.dismiss();
    }
}
