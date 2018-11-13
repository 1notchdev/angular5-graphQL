import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { AspectService } from '../../../../model/services/aspect-service.service';
import { TaskQueue } from '../../../../model/utils/task-queue';
import { Aspect } from '../../../../model/entities/aspect';
import { map } from 'rxjs/operators';
import { ElementService } from '../../../../model/services/element-service.service';


@Component({
    selector: "element-aspect-selector-dialog",
    templateUrl: "./element-aspect-selector.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementAspectSelectorComponent {

    @Input() public visible: boolean;
    @Input() public aspects: Aspect[] = [];
    @Input() public elementId: string = "";
    @Output() readonly visibleChange = new EventEmitter<boolean>();
    @Output() readonly onNewAspectAdded = new EventEmitter<any>();

    private _selectedAspects: Aspect[] = [];
    constructor(private _elementService: ElementService, private _errorHandler: ErrorHandler) { }

    private close() {
        this._selectedAspects = [];
        this.visible = false;
        this.visibleChange.emit(true);
    }

    private onSubmit() {
        if (!this._selectedAspects || this._selectedAspects.length == 0) {
            this.close();
        }
        else this._update(this.aspects);
    }

    private _loadingVisble = false;
    private _update(aspects: Aspect[]) {
        if (this._loadingVisble) return;
        try {
            this._loadingVisble = true;
            this._elementService.addAspectsToElement(this._selectedAspects.map(e => e.id), this.elementId).finally(() => {
                this._loadingVisble = false;
            }).subscribe(() => {
                this.close();
                this.onNewAspectAdded.emit(true);
            });
        } catch (e) {
            this._errorHandler.handleError(e);
            this._loadingVisble = false;
        }
    }

}