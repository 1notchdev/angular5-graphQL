import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { AspectService } from '../../../../model/services/aspect-service.service';
import { TaskQueue } from '../../../../model/utils/task-queue';
import { Aspect } from '../../../../model/entities/aspect';
import { map } from 'rxjs/operators';


@Component({
    selector: "aspect-selector-dialog",
    templateUrl: "./aspect-selector.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectSelectorComponent {

    @Input() public visible: boolean;
    @Input() public aspects: Aspect[] = [];
    @Output() readonly visibleChange = new EventEmitter<boolean>();

    private _selectedAspects: Aspect[] = [];
    private _statusMessages: any[] = [];
    constructor(private _aspectService: AspectService, private _errorHandler: ErrorHandler) { }


    private close() {
        this.visible = false;
        this.visibleChange.emit(true);
    }

    private onSubmit() {
        this._update(this.aspects);

    }

    private _successUpdate: number = 0;
    private _loadingVisble = false;
    private _update(aspects: Aspect[]) {
        if (this._loadingVisble) return;
        try {
            this._successUpdate = 0;
            this._loadingVisble = true;
            this._aspectService.addParentsToAspects(this._selectedAspects.map(asp => asp.id), aspects).finally(() => {
                this._loadingVisble = false;
                if (this._successUpdate == this.aspects.length) {
                    this.close();
                }
            }).subscribe((result) => {
                if (result.success) {
                    ++this._successUpdate;
                }
                else {
                    this._statusMessages.unshift({
                        content: `Failed to update parents for aspect: [${result.aspect.name}] - ID: ${result.aspect.id}`,
                        aspect: result.aspect
                    });
                }
            });
        } catch (e) {
            this._errorHandler.handleError(e);
            this._loadingVisble = false;
        }
    }

    private onRetry(aspect: Aspect) {
        this._update([aspect]);
    }

}