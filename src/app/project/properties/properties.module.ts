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
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesDetailsComponent } from './details/properties-details.component';
import { PropertiesHomeComponent } from './home/properties-home.component';
import { PropertiesEventsComponent } from './events/properties-events.component';


const routes: Routes = [
    {
        path: "",
        component: PropertiesComponent,

    },
    {
        path: ":id",
        component: PropertiesDetailsComponent,
        children: [
            {
                path: "details",
                component: PropertiesHomeComponent
            },
            {
                path: "history",
                component: PropertiesEventsComponent
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
        PropertiesComponent,
        PropertiesHomeComponent,
        PropertiesDetailsComponent,
        PropertiesEventsComponent
    ]
})
export class PropertiesModule {
}