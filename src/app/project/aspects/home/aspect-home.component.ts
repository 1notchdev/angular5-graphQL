import { Component, ViewEncapsulation, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
    templateUrl: "./aspect-home.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectHomeComponent implements OnInit, OnDestroy {
    private _sub: Subscription;
    private _aspectID: string;
    private _aspect = {};
    private _popupVisible = false;

    constructor(private _aspectService: AspectService, private _route: ActivatedRoute, private _router: Router, private _errorHandler: ErrorHandler) {

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
        this._aspectService.getAspectByID(this._aspectID).subscribe(aspect => {
            this._aspect = aspect;
        }, err => {
            this._errorHandler.handleError(err);
        });
    }

    private onDeleteAspect() {
        this._aspectService.deleteAspect(this._aspectID).subscribe(() => {
            this._router.navigate(['../../'], { relativeTo: this._route });
        });
    }

    private onOpenExtendParentDialog() {
        this._popupVisible = true;
    }

}