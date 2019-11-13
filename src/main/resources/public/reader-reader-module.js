(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reader-reader-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/reader/reader-page.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/reader/reader-page.component.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <app-ebook-reader *ngIf=\"ebookSource\"\n                      [ebookSource]=\"ebookSource\" [bookDTO]=\"bookDTO\"></app-ebook-reader>\n</ion-content>");

/***/ }),

/***/ "./src/app/reader/reader-page.component.scss":
/*!***************************************************!*\
  !*** ./src/app/reader/reader-page.component.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlYWRlci9yZWFkZXItcGFnZS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/reader/reader-page.component.ts":
/*!*************************************************!*\
  !*** ./src/app/reader/reader-page.component.ts ***!
  \*************************************************/
/*! exports provided: ReaderPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReaderPage", function() { return ReaderPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/native-storage/ngx */ "./node_modules/@ionic-native/native-storage/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/facebook/ngx */ "./node_modules/@ionic-native/facebook/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_http_parse_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/http-parse.service */ "./src/app/services/http-parse.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var ReaderPage = /** @class */ (function () {
    function ReaderPage(fb, nativeStorage, router, storage, route, menuController, httpParseService) {
        this.fb = fb;
        this.nativeStorage = nativeStorage;
        this.router = router;
        this.storage = storage;
        this.route = route;
        this.menuController = menuController;
        this.httpParseService = httpParseService;
    }
    ReaderPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.enableMenu();
                this.route.params.subscribe(function (params) {
                    _this.enableMenu();
                    if (_this.router.getCurrentNavigation().extras.state) {
                        _this.bookDTO = _this.router.getCurrentNavigation().extras.state.book;
                        _this.ebookSource = _this.bookDTO.fileUrl;
                        _this.httpParseService.updateLastReadBook(_this.bookDTO).subscribe();
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ReaderPage.prototype.enableMenu = function () {
        this.menuController.enable(true, 'ebook-menu');
    };
    ReaderPage.prototype.ngAfterViewInit = function () {
    };
    ReaderPage.ctorParameters = function () { return [
        { type: _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_4__["Facebook"] },
        { type: _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_2__["NativeStorage"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"] },
        { type: _services_http_parse_service__WEBPACK_IMPORTED_MODULE_6__["HttpParseService"] }
    ]; };
    ReaderPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __importDefault(__webpack_require__(/*! raw-loader!./reader-page.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/reader/reader-page.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./reader-page.component.scss */ "./src/app/reader/reader-page.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_4__["Facebook"],
            _ionic_native_native_storage_ngx__WEBPACK_IMPORTED_MODULE_2__["NativeStorage"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"],
            _services_http_parse_service__WEBPACK_IMPORTED_MODULE_6__["HttpParseService"]])
    ], ReaderPage);
    return ReaderPage;
}());



/***/ }),

/***/ "./src/app/reader/reader.module.ts":
/*!*****************************************!*\
  !*** ./src/app/reader/reader.module.ts ***!
  \*****************************************/
/*! exports provided: ReaderPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReaderPageModule", function() { return ReaderPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _reader_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reader-page.component */ "./src/app/reader/reader-page.component.ts");
/* harmony import */ var _ebook_reader_ebook_reader_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ebook-reader/ebook-reader.module */ "./src/app/ebook-reader/ebook-reader.module.ts");
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
        component: _reader_page_component__WEBPACK_IMPORTED_MODULE_5__["ReaderPage"]
    }
];
var ReaderPageModule = /** @class */ (function () {
    function ReaderPageModule() {
    }
    ReaderPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _ebook_reader_ebook_reader_module__WEBPACK_IMPORTED_MODULE_6__["EbookReaderModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_reader_page_component__WEBPACK_IMPORTED_MODULE_5__["ReaderPage"]]
        })
    ], ReaderPageModule);
    return ReaderPageModule;
}());



/***/ })

}]);
//# sourceMappingURL=reader-reader-module.js.map