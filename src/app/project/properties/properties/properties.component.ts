import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ElementService } from '../../../model/services/element-service.service';
import { FlatPropertyGroup, Property } from '../../../model/entities/property';
import { Subscription } from 'rxjs';
import { PropertyService } from '../../../model/services/property-service.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
    templateUrl: "./properties.component.html",
    styleUrls: ["./index.scss"]
})
export class PropertiesComponent implements OnInit {
    private _propertyGroup = new FlatPropertyGroup();
    private _popupVisible = false;
    private _selectedProperties = [];

    constructor(private _propertyService: PropertyService) {

    }

    ngOnInit() {
        this._refresh();
    }

    private _refresh() {
        this._propertyService.getProperties().subscribe((propertyGroup: FlatPropertyGroup) => {
            this._propertyGroup = propertyGroup;
        });
    }
    private getGroupHeader(aspectId: string) {
        return this._propertyGroup.getGroupName(aspectId);
    }

    private onDeleteProperty(propertyId: string) {
        this._deleteProperties([propertyId]);
    }

    private _deleteProperties(propertyIds: string[]) {
        this._propertyService.deleteProperty(propertyIds).subscribe(() => {
            this._refresh();
        });
    }

    private onDeleteProperties(properties: Property[]) {
        this._deleteProperties(properties.map(p => p.id));
    }

    private onOpenNewPropertyDialog() {
        this._popupVisible = true;
    }

    private onNewPropertyCreated() {
        this._refresh();
    }


}