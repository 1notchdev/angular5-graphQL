import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AspectService } from '../../../model/services/aspect-service.service';
import { NotificationService } from '../../../model/services/notification-service.service';
import { Aspect } from '../../../model/entities/aspect';



@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
    templateUrl: "./aspects.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectsComponent implements OnInit {
    data: any[];
    private _selectedAspects: Aspect[] = [];
    constructor(private _aspectService: AspectService, private _notif: NotificationService) {

    }

    ngOnInit() {
        this._refresh();
    }

    private _refresh() {
        this._aspectService.getAspects().subscribe(data => {
            this.data = data;
        });
    }

    popupVisible = false;

    showPopUp() {
        this.popupVisible = true;
    }

    private onAspectCreated(newLabel: any) {
        this._refresh();
    }

    private onDeleteAspect(aspectId: string) {
        this._aspectService.deleteAspect(aspectId).subscribe(() => this._refresh());
    }

    private _extendPopupVisible = false;
    private onOpenExtendDialog(selectedAspects: Aspect[]) {
        if (selectedAspects.length == 0) return;
        this._selectedAspects = selectedAspects;
        this._extendPopupVisible = true;
    }

}