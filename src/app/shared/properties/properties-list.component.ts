import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { Property } from '../../model/entities/property';

@Component({
    selector: "properties-list",
    templateUrl: "./properties-list.component.html",
    styleUrls: ['./properties-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PropertiesListComponent {

    @Input() public properties: Property[] = [];
    @Input() public active = true;

}