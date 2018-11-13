
import { Component, ViewEncapsulation, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ElementService } from '../../../model/services/element-service.service';
import { Element } from '../../../model/entities/element';


@Component({
    templateUrl: "./element-home.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementHomeComponent implements OnInit, OnDestroy {
    private _sub: Subscription;
    private _elementID: string;
    private element: Element = new Element();
    private popupVisible = false;

    constructor(private _elementService: ElementService, private _route: ActivatedRoute, private _router: Router, private _errorHandler: ErrorHandler) {

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
        this._elementID = this._route.parent.snapshot.params['id'];
        this._elementService.getElementByID(this._elementID).subscribe(element => {
            this.element = element;
        }, err => {
            this._errorHandler.handleError(err);
        });
    }

    private onDeleteElement() {
        this._elementService.deleteElements(this._elementID).subscribe(() => {
            this._router.navigate(['../../'], { relativeTo: this._route });
        });
    }

    private onDuplicateElement() {
        this.popupVisible = true;
    }

}