import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import {
    DxLookupModule, DxTreeViewModule, DxScrollViewModule, DxBoxModule, DxFormModule,
    DxMenuModule, DxListModule, DxDataGridModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule, DxTagBoxModule, DxLoadIndicatorModule, DxLoadPanelModule
} from "devextreme-angular";
import { ElementsComponent } from "./elements/elements.component";
import { SharedModule } from "../../shared/shared.module";
import { ElementPropertiesComponent } from "./properties/element-properties.component";
import { ElementHomeComponent } from "./home/element-home.component";
import { ElementEventsComponent } from "./events/element-events.component";
import { ElementAspectsComponent } from "./aspects/element-aspects.component";
import { ElementDetailsComponent } from "./details/element-details.component";
import { ElementsCreatorComponent } from "./creator/elements-creator.component";
import { CoreDirectiveModule } from '../../_directives/app.module';

import { ElementAspectSelectorComponent } from './dialogs/aspect-selector/element-aspect-selector.component';

const routes: Routes = [
    {
        path: "",
        component: ElementsComponent,

    },
    {
        path: ":id",
        component: ElementDetailsComponent,
        children: [
            {
                path: "details",
                component: ElementHomeComponent
            },
            {
                path: "aspects",
                component: ElementAspectsComponent
            },
            {
                path: "properties",
                component: ElementPropertiesComponent
            },
            {
                path: "history",
                component: ElementEventsComponent
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
        DxMenuModule,
        DxTreeViewModule,
        DxTextBoxModule,
        DxListModule,
        DxPopupModule,
        DxLoadPanelModule,
        DxTextAreaModule,
        DxLoadIndicatorModule,
        DxTagBoxModule,
        DxDataGridModule,
        CoreDirectiveModule,
        RouterModule.forChild(routes)
    ], exports: [
    ], declarations: [
        ElementsComponent,
        ElementPropertiesComponent,
        ElementHomeComponent,
        ElementEventsComponent,
        ElementAspectsComponent,
        ElementDetailsComponent,
        ElementsCreatorComponent,
        ElementAspectSelectorComponent,
    ]
})
export class ElementsModule {
}