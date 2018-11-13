import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import {
    DxScrollViewModule, DxFormModule,
    DxMenuModule, DxListModule, DxDataGridModule, DxTreeListModule, DxTextBoxModule, DxPopupModule, DxSelectBoxModule,
    DxLookupModule, DxTagBoxModule, DxCheckBoxModule, DxRadioGroupModule, DxValidatorModule, DxButtonModule, DxLoadPanelModule
} from "devextreme-angular";
import { SharedModule } from "../../shared/shared.module";
import { AspectHomeComponent } from "./home/aspect-home.component";
import { AspectEventsComponent } from "./events/aspect-events.component";
import { AspectPropertiesComponent } from "./properties/aspect-properties.component";
import { AspectHierarchyComponent } from "./hierachy/aspect-hierarchy.component";
import { AspectDynamicsComponent } from "./dynamics/aspect-dynamics.component";
import { AspectDetailsComponent } from "./details/aspect-details.component";
import { AspectsComponent } from "./aspects/aspects.component";
//import { MatButtonModule, MatIconModule, MatStepperModule } from "@angular/material";
//import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AspectCreatorComponent } from "./creator/aspect-creator.component";

import { PropertyComponentEditComponent } from "./creator/edit/component/property-component.component";
import { PropertyNumericalEditComponent } from "./creator/edit/numerical/property-numerical.component";
import { RuleEditComponent } from './creator/edit/rules/rules.component';
import { AspectSelectorComponent } from './dialogs/aspect-selector/aspect-selector.component';
import { NewPropertyComponent } from './dialogs/new-property/new-property.component';
import { CoreDirectiveModule } from '../../_directives/app.module';

const routes: Routes = [
    {
        path: "",
        component: AspectsComponent,

    },
    {
        path: ":id",
        component: AspectDetailsComponent,
        children: [
            {
                path: "details",
                component: AspectHomeComponent
            },
            {
                path: "properties",
                component: AspectPropertiesComponent
            },
            {
                path: "hierarchy",
                component: AspectHierarchyComponent
            },
            {
                path: "dynamics",
                component: AspectDynamicsComponent
            },
            {
                path: "events",
                component: AspectEventsComponent
            },
            {
                path: "",
                redirectTo: "details",
                pathMatch: 'full'
            }
        ]
    },
];
@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        DxFormModule,
        DxScrollViewModule,
        DxTextBoxModule,
        DxTreeListModule,
        DxPopupModule,
        DxButtonModule,
        DxMenuModule,
        DxListModule,
        DxDataGridModule,
        DxLookupModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxTagBoxModule,
        DxRadioGroupModule,
        DxValidatorModule,
        DxLoadPanelModule,
        CoreDirectiveModule,
        SharedModule,
        //  MatStepperModule,
        //  ReactiveFormsModule,
        //  FormsModule,
        RouterModule.forChild(routes)
    ], exports: [
        PropertyComponentEditComponent,
        PropertyNumericalEditComponent
    ], declarations: [
        AspectPropertiesComponent,
        AspectDetailsComponent,
        AspectEventsComponent,
        AspectHomeComponent,
        AspectHierarchyComponent,
        AspectDynamicsComponent,
        AspectCreatorComponent,
        AspectsComponent,
        PropertyComponentEditComponent,
        PropertyNumericalEditComponent,
        RuleEditComponent,
        AspectSelectorComponent,
        NewPropertyComponent,

    ],
    entryComponents: [
        PropertyComponentEditComponent,
        PropertyNumericalEditComponent,
        RuleEditComponent,
    ]
})
export class AspectsModule {


}