import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { PropertyInput } from "../../../../../model/entities/property";

@Component({
    selector: "property-numerical-edit",
    templateUrl: "./property-numerical.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class PropertyNumericalEditComponent {
    private _timeSeriesTypes = ['Stock', 'Flow'];

    @Output()
    readonly onDelete = new EventEmitter<any>();

    @Input()
    public timeSeries: boolean;

    @Input()
    public propertyName: string;

    @Input()
    public aggregationMethod: string;

    @Input()
    public timeSeriesType = this._timeSeriesTypes[0];

    private onClickDelete() {
        this.onDelete.emit(this);
    }

    private _getAttributes() {
        return JSON.stringify({
            timeSeries: this.timeSeries,
            aggregationMethod: this.aggregationMethod,
            timeSeriesType: this.timeSeriesType
        });
    }

    public getProperty(aspectId: string): PropertyInput {
        return new PropertyInput(
            aspectId,
            this.propertyName,
            "Numerical",
            this._getAttributes()
        );
    }


}