import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, Type } from "@angular/core";
import { PropertyInput } from "../../../../../model/entities/property";

@Component({
    selector: "property-component-edit",
    templateUrl: "./property-component.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PropertyComponentEditComponent {

    @Input()
    public propertyName: string;
    @Input()
    public componenType: string;

    @Output()
    readonly onDelete = new EventEmitter<any>();

    private onClickDelete() {
        this.onDelete.emit(this);
    }

    private _getAttributes() {
        return JSON.stringify({
            componentType: this.componenType
        });
    }

    public getProperty(aspectId: string): PropertyInput {
        return new PropertyInput(
            aspectId,
            this.propertyName,
            "Component",
            this._getAttributes()
        );
    }

}