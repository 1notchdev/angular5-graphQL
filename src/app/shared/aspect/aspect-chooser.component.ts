import {
    Component, EventEmitter, Input, Output, ViewEncapsulation, ViewContainerRef,
    ComponentFactoryResolver, Type,
    ViewChild,
    ErrorHandler,
    OnInit
} from "@angular/core";
import { Aspect } from "../../model/entities/aspect";
import { AspectService } from "../../model/services/aspect-service.service";
import { AspectGraph } from "../../model/utils/graph";

@Component({
    selector: "aspect-chooser",
    templateUrl: "./aspect-chooser.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectChooserComponent implements OnInit {

    @Input()
    public set excludedAspects(values: Aspect[]) {
        this._excludedAspects = values;
        this._updateValidAspects();
    }

    public get excludedAspects() {
        return this._excludedAspects;
    }

    @Input()
    public set selectedAspects(values: Aspect[]) {
        this._selectedAspects = values;
        this._updateValidAspects();
    }

    public get selectedAspects() {
        return this._selectedAspects;
    }

    @Output() readonly selectedAspectsChange = new EventEmitter<Aspect[]>();

    private _excludedAspects: Aspect[] = [];
    private _selectedAspects: Aspect[] = [];

    private _validAspects: Aspect[] = [];

    private _aspectGraph: AspectGraph;

    constructor(private _aspectSerivce: AspectService) { }

    ngOnInit() {
        this._aspectSerivce.getAspectGraph().subscribe((graph: AspectGraph) => {
            this._aspectGraph = graph;
            this._updateValidAspects();
        })
    }

    private _updateValidAspects() {
        if (!this._aspectGraph) return;
        this._validAspects = this._aspectGraph.getAspectsWhichDoNotHaveAnyRelationWith(this._selectedAspects, this.excludedAspects).concat(this._selectedAspects);
    }

    private onSelectedAspectsChange($event) {
        this._selectedAspects = $event.value;
        this._updateValidAspects();
        this.selectedAspectsChange.emit(this._selectedAspects);
    }
}
