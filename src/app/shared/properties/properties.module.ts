

import { NgModule } from "@angular/core";
import { PropertiesListComponent } from "./properties-list.component";
import { PropertyGridComponent } from "./property-grid.component";
import {
    DxAccordionModule, DxPivotGridModule, DxScrollViewModule, DxTabPanelModule,
    DxTagBoxModule, DxTreeViewModule
} from "devextreme-angular";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        DxTagBoxModule,
        DxPivotGridModule,
        DxAccordionModule,
        DxTabPanelModule,
        DxScrollViewModule,
        DxTreeViewModule

    ],
    exports: [
        PropertiesListComponent,
        PropertyGridComponent

    ],
    declarations: [
        PropertiesListComponent,
        PropertyGridComponent
    ]
})
export class PropertiesModule {


}