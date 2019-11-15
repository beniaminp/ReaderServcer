import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AppStorageService} from "./er-local-storage/app-storage.service";
import {UserDTO} from "./models/UserDTO";
import {HttpParseService} from "./services/http-parse.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private router: Router,
        private appStorageService: AppStorageService,
        private httpParseService: HttpParseService) {
        this.initializeApp();
    }

    async initializeApp() {
        this.statusBar.styleDefault();

        this.platform.ready().then(async () => {
            let userDTO = this.appStorageService.getUserDTO();
            let token = await this.appStorageService.getToken();
            if (userDTO != null && token != null) {
                this.httpParseService.initApp();
                this.router.navigate(["/shelf"]);
            } else {
                this.router.navigate(["/auth"]);
            }
        });
    }
}
