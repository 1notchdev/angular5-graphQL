import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, ViewChild } from "@angular/core";
import { RuleInput } from "../../../../../model/entities/rule";
import { PropertyInput, Property } from "../../../../../model/entities/property";
import { RuleEditorComponent } from "../../../../../shared/rule-editor/rule-editor.component";
import { IRule } from "../../../../../shared/rule-editor/model";

@Component({
    selector: "property-rule-edit",
    templateUrl: "./rules.component.html",
    styleUrls: ['index.scss']
})
export class RuleEditComponent {

    @Input()
    public propertyList: Property[];

    @Input()
    public embedded: boolean = true;

    @Input()
    public disabled: boolean = false;

    @Output()
    readonly onDelete = new EventEmitter<any>();

    @Output()
    readonly onAdd = new EventEmitter<any>();

    @ViewChild('ruleEditor') ruleEditor : RuleEditorComponent;

    private _selectedProperty: Property;
    private _expression: string;

    private onClickDelete() {
        this.onDelete.emit(this);
    }

    private onClickAddRule() {
        const rule: IRule = this.ruleEditor.getRule();
        if (rule.valid) {
            this.onAdd.emit(this);
        }
    }

    public getRule(aspectId: string): RuleInput {
        const rule: IRule = this.ruleEditor.getRule();
        return new RuleInput(`${rule.value}@${rule.uuidValue}`, aspectId, rule.propertyID);
    }

}