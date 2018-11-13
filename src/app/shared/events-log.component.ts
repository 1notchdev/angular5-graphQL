import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from "../_services/script-loader.service";

export class Product {
    ID: string;
    name: string;
    expanded?: boolean;
    categoryId?: string;
    iconSrc?: string;
    price?: number;
}

@Component({
    selector: "events-log",
    templateUrl: "./events-log.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class EventsLogComponent implements OnInit, AfterViewInit {



    constructor(private _script: ScriptLoaderService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/app/js/dashboard.js');

    }

}