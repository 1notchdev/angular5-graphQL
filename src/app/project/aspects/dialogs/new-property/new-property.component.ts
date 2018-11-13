import { Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { AspectService } from '../../../../model/services/aspect-service.service';
import { TaskQueue } from '../../../../model/utils/task-queue';
import { Aspect } from '../../../../model/entities/aspect';
import { map } from 'rxjs/operators';
import { PropertyComponentEditComponent } from '../../creator/edit/component/property-component.component';
import { PropertyNumericalEditComponent } from '../../creator/edit/numerical/property-numerical.component';
import { PropertyInput } from '../../../../model/entities/property';
import { PropertyService } from '../../../../model/services/property-service.service';

@Component({
    selector: "new-property-dialog",
    templateUrl: "./new-property.component.html",
    styleUrls: ["./index.scss"]
})
export class NewPropertyComponent {

    @Input() public visible: boolean;
    @Input() public aspectId: string;
    @Output() readonly visibleChange = new EventEmitter<boolean>();
    @Output() readonly onPropertyCreated = new EventEmitter<boolean>();
    @ViewChild('properiesEditForm', { read: ViewContainerRef }) container: ViewContainerRef;

    private _allAspects: Aspect[];
    private _parentAspects: Aspect[];
    private _selectedAspects: Aspect[];
    private _newPropertyType: string;
    private components = [];
    constructor(private _aspectService: AspectService, private componentFactoryResolver: ComponentFactoryResolver,
        private _propertyService: PropertyService) { }

    private close() {
        this.visible = false;
        this.visibleChange.emit(true);
    }

    private onSubmit() {
        const props = this._getPropertyList(this.aspectId);
        if (props && props.length > 0) {
            this._propertyService.createProperties(props).subscribe(() => {
                this.onPropertyCreated.emit();
                this.close();
            });
        } else {
            this.close();
        }
    }

    private onAddNewProperty() {
        switch (this._newPropertyType) {
            case "Component": this.addComponent(this.container, this.components, PropertyComponentEditComponent); break;
            case "Numerical": this.addComponent(this.container, this.components, PropertyNumericalEditComponent); break;
        }

    }

    _getPropertyList(aspectId: string): PropertyInput[] {
        return this.components.map(com => com.instance.getProperty(aspectId));
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

}