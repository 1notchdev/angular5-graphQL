import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ElementService } from '../../../model/services/element-service.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
    templateUrl: "./elements.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementsComponent implements OnInit {

    private popupVisible = false;
    private elements: Element[];
    private _duplicateElement: Element;
    private _selectedElements = [];

    constructor(private _aspectService: AspectService, private _elementService: ElementService) { }


    ngOnInit() {
        this._refresh();
    }

    private _refresh() {
        this._elementService.getElements().subscribe(elements => this.elements = elements);
    }

    showPopUp() {
        this.popupVisible = true;
    }

    private onDeleteElement(elementId: string) {
        if (!elementId) return;
        this._onDeleteElements([elementId]);
    }

    private _onDeleteElements(elementIds: string[]) {
        this._elementService.deleteElements(...elementIds).subscribe(data => {
            this._refresh();
        });
    }

    private onDuplicateElement(elements: Element[]) {
        if (!elements || elements.length !== 1) return;
        this._duplicateElement = elements[0];
        this.popupVisible = true;
    }

    private onNewElementCreated() {
        this._refresh();
    }

    private onDeleteElements(elements: Element[]) {
        if (!elements || elements.length == 0) return;
        this._onDeleteElements(elements.map(e => e.id));
    }

    private onPopupClose() {
        this.popupVisible = false;
        this._duplicateElement = null;
    }


}