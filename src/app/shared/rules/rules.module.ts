

import { NgModule } from "@angular/core";
import {
    DxAccordionModule, DxPivotGridModule, DxScrollViewModule, DxTabPanelModule,
    DxTagBoxModule, DxTreeViewModule, DxListModule, DxCheckBoxModule, DxLoadPanelModule
} from "devextreme-angular";
import { CommonModule } from "@angular/common";
import { RulesListComponent } from "./rules-list.component";
import { ConfirmClickDirective } from "../../_directives/click-confirm.directive";
import { CoreDirectiveModule } from "../../_directives/app.module";

@NgModule({
    imports: [
        CommonModule,
        DxTagBoxModule,
        DxPivotGridModule,
        DxAccordionModule,
        DxListModule,
        DxCheckBoxModule,
        DxLoadPanelModule,
        DxTabPanelModule,
        DxScrollViewModule,
        DxTreeViewModule,
        CoreDirectiveModule
    ],
    exports: [
        RulesListComponent

    ],
    declarations: [
        RulesListComponent
    ]
})
export class RulesModule {


}