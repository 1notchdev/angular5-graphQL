import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlatPropertyGroup } from '../../../model/entities/property';
import { PropertyService } from '../../../model/services/property-service.service';



@Component({
    templateUrl: "./aspect-properties.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectPropertiesComponent implements OnInit, OnDestroy {
    private _sub: Subscription;
    private _propertyGroup = new FlatPropertyGroup();
    private _popupVisible = false;
    private _aspectID: string;

    constructor(private _aspectService: AspectService, private _route: ActivatedRoute, private _propertyService: PropertyService) {

    }

    ngOnInit() {
        this._sub = this._route.parent.params.subscribe(params => {
            this._refresh();
        });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    private _refresh() {
        this._aspectID = this._route.parent.snapshot.params['id'];
        this._aspectService.getAspectWithParentsAndProperties(this._aspectID).subscribe((propertyGroup: FlatPropertyGroup) => {
            this._propertyGroup = propertyGroup;
        });
    }
    private getGroupHeader(aspectId: string) {
        return this._propertyGroup.getGroupName(aspectId);
    }

    private onDeleteProperty(propertyId: string) {
        this._propertyService.deleteProperty([propertyId]).subscribe(() => {
            this._refresh();
        });
    }

    private onOpenProperty(propertyId: string) {

    }

    private onOpenNewPropertyDialog() {
        this._popupVisible = true;
    }

    private onNewPropertyCreated() {
        this._refresh();
    }


}