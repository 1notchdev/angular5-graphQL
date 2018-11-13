import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import {
    DxLookupModule, DxTreeViewModule, DxScrollViewModule, DxBoxModule, DxFormModule,
    DxMenuModule, DxListModule, DxDataGridModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule, DxTagBoxModule, DxLoadIndicatorModule, DxLoadPanelModule, DxPivotGridModule
} from "devextreme-angular";
import { SharedModule } from "../../shared/shared.module";
import { CoreDirectiveModule } from '../../_directives/app.module';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { ScenariosDetailsComponent } from './details/scenarios-details.component';
import { ScenariosHomeComponent } from './home/scenarios-home.component';


const routes: Routes = [
    {
        path: "",
        component: ScenariosComponent,

    },
    {
        path: ":id",
        component: ScenariosDetailsComponent,
        children: [
            {
                path: "details",
                component: ScenariosHomeComponent
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
        DxPivotGridModule,
        DxLoadIndicatorModule,
        DxTagBoxModule,
        DxDataGridModule,
        CoreDirectiveModule,
        RouterModule.forChild(routes)
    ], exports: [
    ], declarations: [
        ScenariosComponent,
        ScenariosHomeComponent,
        ScenariosDetailsComponent
    ]
})
export class ScenariosModule {
}