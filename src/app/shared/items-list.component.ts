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
    selector: "items-list",
    templateUrl: "./items-list.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ItemsListComponent implements OnInit, AfterViewInit {

    selectedItems: any[] = [];
    products: Product[] = [
        {
            ID: "1_1",
            name: "Company",
            expanded: true
        }, {
            ID: "1_1_1",
            name: "Borrower"
        }, {
            ID: "1_1_1_2",
            categoryId: "1_1_1",
            name: "Property Manager",
            price: 270
        }, {
            ID: "1_1_2",
            name: "Real Estate Developer",
            expanded: true
        }, {
            ID: "1_1_2_1",
            categoryId: "1_1_2",
            name: "Subsidiary",
            price: 1200
        }, {
            ID: "1_1_2_2",
            categoryId: "1_1_2",
            name: "Investor",
            price: 1450
        }, {
            ID: "1_1_2_3",
            categoryId: "1_1_2",
            name: "Project Manager",
            price: 1600
        }, {
            ID: "1_1_2_4",
            categoryId: "1_1_2",
            name: "Contractor",
            price: 1750
        }, {
            ID: "1_1_2_5",
            categoryId: "1_1_2",
            name: "Construction Manager",
            price: 4000
        }, {
            ID: "1_1_3",
            name: "Listed Company"
        }, {
            ID: "1_1_3_1",
            categoryId: "1_1_3",
            name: "Property Owner",
        }, {
            ID: "1_1_3_1_1",
            categoryId: "1_1_3_1",
            name: "Employer",
            price: 160
        }, {
            ID: "1_1_4",
            categoryId: "1_1",
            name: "Land Bank"
        }, {
            ID: "1_1_4_1",
            categoryId: "1_1_4",
            name: "Competitor",
            price: 550
        }, {
            ID: "1_1_4_2",
            categoryId: "1_1_4",
            name: "Advertiser",
            price: 750
        }
    ];


    constructor(private _script: ScriptLoaderService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
        //     'assets/app/js/dashboard.js');

    }

}