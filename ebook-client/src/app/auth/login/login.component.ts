import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDTO} from "../../models/UserDTO";
import {HttpParseService} from "../../services/http-parse.service";
import {AppStorageService} from "../../er-local-storage/app-storage.service";
import {LoadingController} from "@ionic/angular";
import {LoadingService} from "../../services/loading.service";
import {ConnectionDTO} from "../../models/ConnectionDTO";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                public httpParseService: HttpParseService,
                public appStorageService: AppStorageService,
                private loadingService: LoadingService) {
    }

    ngOnInit() {
    }

    public login(form: NgForm) {
        this.loadingService.showLoader();
        let userDTO: UserDTO = new UserDTO();
        userDTO.email = form.controls.email.value;
        userDTO.password = form.controls.password.value;
        this.httpParseService.loginUser(userDTO).subscribe(
            (res: any) => {
                userDTO = res;
                this.appStorageService.setUserDTO(userDTO);
                this.httpParseService.initApp();

                this.loadingService.dismissLoader();
                this.goToShelf();

            }, (e) => {
                this.loadingService.dismissLoader();
                console.error(e);
            }
        );
    }

    public goToRegister() {
        this.router.navigate(['auth/sign-up']);
    }

    public goToShelf() {
        this.router.navigate(['shelf']);
    }
}
