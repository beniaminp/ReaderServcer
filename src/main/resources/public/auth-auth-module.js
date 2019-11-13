(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content color=\"primary\" padding>\n    <form #form=\"ngForm\" (ngSubmit)=\"login(form)\" (keyup.enter)=\"login(form)\">\n        <ion-grid>\n            <ion-row color=\"primary\" justify-content-center>\n                <ion-col align-self-center size-md=\"6\" size-lg=\"5\" size-xs=\"12\">\n                    <div text-center>\n                        <h3>Login</h3>\n                    </div>\n                    <div padding>\n                        <ion-item>\n                            <ion-input name=\"email\" type=\"email\" placeholder=\"your@email.com\" ngModel\n                                       required></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-input name=\"password\" type=\"password\" placeholder=\"Password\" ngModel\n                                       required></ion-input>\n                        </ion-item>\n                    </div>\n                    <div padding>\n                        <ion-button size=\"large\" type=\"submit\" [disabled]=\"form.invalid\" expand=\"block\">\n                            <ion-ripple-effect></ion-ripple-effect>\n                            Login\n                        </ion-button>\n                    </div>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <div text-center>\n                    If you don't have an account, please <b (click)=\"goToRegister()\"\n                                                            style=\"cursor: pointer; font-weight: bold;\">register</b>\n                    first!\n                </div>\n            </ion-row>\n        </ion-grid>\n    </form>\n</ion-content>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/sign-up/sign-up-page.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/sign-up/sign-up-page.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content  color=\"primary\">\n  <form  #form=\"ngForm\" (ngSubmit)=\"register(form)\">\n    <ion-grid>\n      <ion-row color=\"primary\" justify-content-center>\n        <ion-col align-self-center size-md=\"6\" size-lg=\"5\" size-xs=\"12\">\n          <div text-center>\n            <h3>Create your account!</h3>\n          </div>\n          <div padding>\n            <ion-item>\n              <ion-input  name=\"name\" type=\"text\" placeholder=\"Name\" ngModel required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input name=\"email\" type=\"email\" placeholder=\"your@email.com\" ngModel required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input name=\"password\" type=\"password\" placeholder=\"Password\" ngModel required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-input name=\"confirm\" type=\"password\" placeholder=\"Password again\" ngModel required></ion-input>\n            </ion-item>\n          </div>\n          <div padding>\n            <ion-button  size=\"large\" type=\"submit\" [disabled]=\"form.invalid\" expand=\"block\">Register</ion-button>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>");

/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sign_up_sign_up_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up/sign-up-page */ "./src/app/auth/sign-up/sign-up-page.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'sign-up',
        component: _sign_up_sign_up_page__WEBPACK_IMPORTED_MODULE_3__["SignUpPage"]
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
    }
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
                _sign_up_sign_up_page__WEBPACK_IMPORTED_MODULE_3__["SignUpPage"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/auth/login/login.component.scss":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-item {\n  --background: #3880ff;\n  --color: #fff; }\n\nion-button {\n  --background: #062f77; }\n\na {\n  color: #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RyYWdvcy5wYW50aXJ1L0RvY3VtZW50cy9oZGQvcHJvamVjdHMvZWJvb2stcmVhZGVyL2Vib29rLXJlYWRlci9zcmMvYXBwL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBYTtFQUNiLGFBQVEsRUFBQTs7QUFHVjtFQUNFLHFCQUFhLEVBQUE7O0FBR2Y7RUFDRSxXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWl0ZW0ge1xuICAtLWJhY2tncm91bmQ6ICMzODgwZmY7XG4gIC0tY29sb3I6ICNmZmY7XG59XG5cbmlvbi1idXR0b24ge1xuICAtLWJhY2tncm91bmQ6ICMwNjJmNzc7XG59XG5cbmEge1xuICBjb2xvcjogI2ZmZjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_UserDTO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/UserDTO */ "./src/app/models/UserDTO.ts");
/* harmony import */ var _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/http-parse.service */ "./src/app/services/http-parse.service.ts");
/* harmony import */ var _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../er-local-storage/app-storage.service */ "./src/app/er-local-storage/app-storage.service.ts");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/loading.service */ "./src/app/services/loading.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, httpParseService, appStorageService, loadingService) {
        this.router = router;
        this.httpParseService = httpParseService;
        this.appStorageService = appStorageService;
        this.loadingService = loadingService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        this.loadingService.showLoader();
        var userDTO = new _models_UserDTO__WEBPACK_IMPORTED_MODULE_2__["UserDTO"]();
        userDTO.email = form.controls.email.value;
        userDTO.password = form.controls.password.value;
        this.httpParseService.loginUser(userDTO).subscribe(function (res) {
            userDTO = res;
            _this.appStorageService.setUserDTO(userDTO);
            _this.httpParseService.initApp();
            _this.loadingService.dismissLoader();
            _this.goToShelf();
        }, function (e) {
            _this.loadingService.dismissLoader();
            console.error(e);
        });
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(['auth/sign-up']);
    };
    LoginComponent.prototype.goToShelf = function () {
        this.router.navigate(['shelf']);
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__["HttpParseService"] },
        { type: _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__["AppStorageService"] },
        { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"] }
    ]; };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __importDefault(__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./login.component.scss */ "./src/app/auth/login/login.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__["HttpParseService"],
            _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__["AppStorageService"],
            _services_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/sign-up/sign-up-page.scss":
/*!************************************************!*\
  !*** ./src/app/auth/sign-up/sign-up-page.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-item {\n  --background: #3880ff;\n  --color: #fff; }\n\nion-button {\n  --background: #062f77; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RyYWdvcy5wYW50aXJ1L0RvY3VtZW50cy9oZGQvcHJvamVjdHMvZWJvb2stcmVhZGVyL2Vib29rLXJlYWRlci9zcmMvYXBwL2F1dGgvc2lnbi11cC9zaWduLXVwLXBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFhO0VBQ2IsYUFBUSxFQUFBOztBQUdWO0VBQ0UscUJBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2F1dGgvc2lnbi11cC9zaWduLXVwLXBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pdGVte1xuICAtLWJhY2tncm91bmQ6ICMzODgwZmY7XG4gIC0tY29sb3I6ICNmZmY7XG59XG5cbmlvbi1idXR0b257XG4gIC0tYmFja2dyb3VuZDogIzA2MmY3Nztcbn0iXX0= */");

/***/ }),

/***/ "./src/app/auth/sign-up/sign-up-page.ts":
/*!**********************************************!*\
  !*** ./src/app/auth/sign-up/sign-up-page.ts ***!
  \**********************************************/
/*! exports provided: SignUpPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpPage", function() { return SignUpPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_UserDTO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/UserDTO */ "./src/app/models/UserDTO.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/http-parse.service */ "./src/app/services/http-parse.service.ts");
/* harmony import */ var _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../er-local-storage/app-storage.service */ "./src/app/er-local-storage/app-storage.service.ts");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/loading.service */ "./src/app/services/loading.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var SignUpPage = /** @class */ (function () {
    function SignUpPage(router, httpParseService, appStorageService, loadingService) {
        this.router = router;
        this.httpParseService = httpParseService;
        this.appStorageService = appStorageService;
        this.loadingService = loadingService;
    }
    SignUpPage.prototype.ngOnInit = function () {
    };
    SignUpPage.prototype.register = function (form) {
        var _this = this;
        this.loadingService.showLoader();
        var userDTO = new _models_UserDTO__WEBPACK_IMPORTED_MODULE_1__["UserDTO"]();
        userDTO.username = form.controls.name.value;
        userDTO.email = form.controls.email.value;
        userDTO.password = form.controls.password.value;
        this.httpParseService.signUpUser(userDTO).subscribe(function (res) {
            userDTO.sessionToken = res.sessionToken;
            userDTO.objectId = res.objectId;
            userDTO.lastReadBook = res.lastReadBook;
            _this.appStorageService.setUserDTO(userDTO);
            _this.loadingService.dismissLoader();
            _this.goToShelf();
        }, function (e) {
            console.error(e);
            _this.loadingService.dismissLoader();
        });
    };
    SignUpPage.prototype.goToShelf = function () {
        this.router.navigate(['shelf']);
    };
    SignUpPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__["HttpParseService"] },
        { type: _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__["AppStorageService"] },
        { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"] }
    ]; };
    SignUpPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-up',
            template: __importDefault(__webpack_require__(/*! raw-loader!./sign-up-page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/sign-up/sign-up-page.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./sign-up-page.scss */ "./src/app/auth/sign-up/sign-up-page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_http_parse_service__WEBPACK_IMPORTED_MODULE_3__["HttpParseService"],
            _er_local_storage_app_storage_service__WEBPACK_IMPORTED_MODULE_4__["AppStorageService"],
            _services_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"]])
    ], SignUpPage);
    return SignUpPage;
}());



/***/ })

}]);
//# sourceMappingURL=auth-auth-module.js.map