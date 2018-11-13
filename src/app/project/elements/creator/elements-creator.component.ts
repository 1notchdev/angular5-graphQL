import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit, ErrorHandler } from "@angular/core";
import { AspectService } from "../../../model/services/aspect-service.service";
import { ElementService } from "../../../model/services/element-service.service";
import { Aspect } from "../../../model/entities/aspect";
import { Observable } from "rxjs/Observable";
import { ElementInput } from "../../../model/entities/element";

@Component({
    selector: "elements-creator",
    templateUrl: "./elements-creator.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementsCreatorComponent {

    @Input()
    public visible: boolean;
    private _duplicateElement: Element;
    private width = '80vw';
    private height = '80vh';

    @Input()
    public set duplicateElement(value: Element) {
        this._duplicateElement = value;
        this._updateSize();
        this._updateSelectedAspects();
    }


    public get duplicateElement(): Element {
        return this._duplicateElement;
    }

    @Output() onCloseEvent = new EventEmitter<boolean>();
    @Output() readonly onNewElementCreated = new EventEmitter();

    private selectedAspects: Aspect[] = [];
    private elementNames: string = "";
    private _statusMessages: any[] = [];

    constructor(private _aspectService: AspectService, private _elementService: ElementService, private _errorHandler: ErrorHandler) { };

    private _updateSize() {
        if (this.duplicateElement) {
            this.height = '40vh';
            this.width = '50vw';
        } else {
            this.height = '80vh';
            this.width = '80vw';
        }
    }
    private _updateSelectedAspects() {
        if (this._duplicateElement) {
            this._elementService.getAspectListOfElement(this._duplicateElement.id).subscribe((list: Aspect[]) => {
                this.selectedAspects = list;
            });
        } else {
            this.selectedAspects = [];
        }

    }

    private _successUpdate: number = 0;
    private _loadingVisble = false;
    private _createElements(): Observable<any> {
        const names = this.elementNames.trim().replace('/^\s*|\s*$/g', '').split(",").map(name => name.trim()).filter(name => name !== "");
        if (this._loadingVisble || names.length == 0) {
            this.onClose();
            return;
        }
        try {
            this._successUpdate = 0;
            this._loadingVisble = true;
            this._elementService.createElements(names.map(e => new ElementInput(e))).subscribe(elements => {
                this.onNewElementCreated.emit();
                if (!this.selectedAspects || this.selectedAspects.length == 0) {
                    this.onClose();
                    return;
                }
                this._elementService.addAspectsToElements(this.selectedAspects.map(e => e.id), elements).finally(() => {
                    this._loadingVisble = false;
                    if (this._successUpdate == elements.length) {
                        this.onClose();
                    }
                }).subscribe((result) => {
                    if (result.success) {
                        ++this._successUpdate;
                    }
                    else {
                        this._statusMessages.unshift({
                            content: `Failed to update aspects for element: [${result.element.name}] - ID: ${result.element.id}`,
                            element: result.element
                        });
                    }
                });
            })
        } catch (e) {
            this._errorHandler.handleError(e);
            this._loadingVisble = false;
        }

    }

    private onClose() {
        this.visible = false;
        this.onCloseEvent.emit(this.visible);
    }

    private onDone() {
        this._createElements();
    }





}