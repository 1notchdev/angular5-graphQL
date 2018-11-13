import {
    Component, EventEmitter, Input, Output, ViewEncapsulation, ViewContainerRef,
    ComponentFactoryResolver, Type,
    ViewChild,
    ErrorHandler
} from "@angular/core";
import { PropertyComponentEditComponent } from "./edit/component/property-component.component";
import { PropertyNumericalEditComponent } from "./edit/numerical/property-numerical.component";
import { RuleEditComponent } from "./edit/rules/rules.component";
import { AspectService } from "../../../model/services/aspect-service.service";
import { AspectInput } from "../../../model/entities/aspect";
import { PropertyService } from "../../../model/services/property-service.service";
import { RuleService } from "../../../model/services/rule-service.service";
import { PropertyInput, FlatPropertyGroup } from "../../../model/entities/property";
import { _throw } from 'rxjs/observable/throw';
import { TaskQueue } from "../../../model/utils/task-queue";
import 'rxjs/add/operator/finally';
import { FlatRuleGroup, RuleGroup } from "../../../model/entities/rule";

@Component({
    selector: "aspect-creator",
    templateUrl: "./aspect-creator.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectCreatorComponent {

    @Input() public visible: boolean;
    @Input() public aspects: any[];

    @Output() readonly onClose = new EventEmitter<boolean>();
    @Output() readonly onAspectCreated = new EventEmitter<any>();

    private _propertyList: any[];
    private _newPropertyType: string;
    private _aspectName: string;
    private _inheritedAspects: any[];
    private _inheritedRule = [];
    private _aspectDescription: string;
    private _aspectID: string;

    ruleComponents = [];
    components = [];
    step: number = 1;
    title = "New Aspect: Structure (Step 1/2)";

    @ViewChild('rulesEditor', { read: ViewContainerRef }) rulesContainer: ViewContainerRef;
    @ViewChild('properiesEditForm', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private _aspectService: AspectService,
        private _propertyService: PropertyService,
        private _ruleService: RuleService,
        private _errorService: ErrorHandler) {
    }

    private _disabledNextButton = false;
    next() {
        if (this._disabledNextButton) return;
        this._disabledNextButton = true;
        this._createAspectAndProperties((aspectId) => {
            this._aspectID = aspectId;
            this.step = 2;
            this.title = "New Aspect: Rules (Step 2/2)";
            this._updatePropertyList();
            this._updateInheritedRules();
            this.onAspectCreated.emit();
        }, (err) => {
            this._disabledNextButton = false;
        });
    }

    close() {
        this.visible = false;
        this.onClose.emit(this.visible);
        this.step = 1;
    }

    back() {
        this.title = "New Aspect: Structure (Step 1/2)";
        this.step = 1;
    }

    private onAddNewProperty() {
        switch (this._newPropertyType) {
            case "Component": this.addComponent(this.container, this.components, PropertyComponentEditComponent); break;
            case "Numerical": this.addComponent(this.container, this.components, PropertyNumericalEditComponent); break;
        }

    }

    addComponent(container: ViewContainerRef, components: any[], componentClass: Type<any>) {
        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const component = container.createComponent(componentFactory);
        component.instance.onDelete.subscribe(e => {
            this.removeComponent(container, components, e);
        })
        // Push the component so that we can keep track of which components are created
        components.push(component);
        return component;
    }

    removeComponent(container: ViewContainerRef, components: any[], componentClass: any) {
        // Find the component
        const component = components.find((component) => component.instance === componentClass);
        const componentIndex = components.indexOf(component);

        if (componentIndex !== -1) {
            // Remove component from both view and array
            container.remove(container.indexOf(component));
            components.splice(componentIndex, 1);
        }
    }

    _getPropertyList(aspectId: string): PropertyInput[] {
        return this.components.map(com => com.instance.getProperty(aspectId));
    }

    private onAddNewRule() {
        this.addComponent(this.rulesContainer, this.ruleComponents, RuleEditComponent).instance.propertyList = this._propertyList;
    }

    private _getRules(aspectId: string) {
        return this.ruleComponents.map(rc => rc.instance.getRule(aspectId));
    }


    private _createAspectAndProperties(success: Function, errHandler: Function) {

        const queue = new TaskQueue();
        this._aspectService.createAspect(new AspectInput(this._aspectName, "default", this._aspectDescription || "")).subscribe(
            (aspect) => {
                if (!aspect.id) {
                    return _throw("Error: Aspect ID is null");
                }
                const props = this._getPropertyList(aspect.id);
                if (props && props.length > 0) {
                    queue.add(this._propertyService.createProperties(props));
                }
                if (this._inheritedAspects && this._inheritedAspects.length > 0) {
                    queue.add(this._aspectService.addParentsToAspect(this._inheritedAspects.map(asp => asp.id), aspect.id))
                }
                queue.completeAll().subscribe(() => success(aspect.id), err => errHandler(err));
            },
            err => errHandler(err));
    }

    private _updatePropertyList() {
        this._aspectService.getAspectWithParentsAndProperties(this._aspectID).subscribe((flatMap: FlatPropertyGroup) => this._propertyList = flatMap.properties);
    }

    private _ruleGroup: RuleGroup[] = [];
    private _updateInheritedRules() {
        this._aspectService.getRulesForAspect(this._aspectID).subscribe((ruleGroup: RuleGroup[]) => {
            this._ruleGroup = ruleGroup;
        }, err => {
            this._ruleGroup = [];
        })
    }

    private _disabledDoneButton = false;
    private onSubmit() {
        if (this._disabledDoneButton) return;
        this._disabledDoneButton = true;
        try {
            const rules = this._getRules(this._aspectID);
            if (rules && rules.length > 0) {
                this._ruleService.createRules(rules)
                    .finally(() => {
                        this._disabledDoneButton = false;
                    })
                    .subscribe((result) => {
                        this.close();
                    }, err => { });
            }
            else this.close();
        } catch (e) {
            this._disabledDoneButton = false;
            throw (e);
        }
    }

}
