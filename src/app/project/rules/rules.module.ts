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
import { RulesComponent } from './rules/rules.component';
import { RuleDetailsComponent } from './details/rule-details.component';
import { RuleHomeComponent } from './home/rule-home.component';
import { RuleEventsComponent } from './events/rule-events.component';


const routes: Routes = [
    {
        path: "",
        component: RulesComponent,

    },
    {
        path: ":id",
        component: RuleDetailsComponent,
        children: [
            {
                path: "details",
                component: RuleHomeComponent
            },
            {
                path: "history",
                component: RuleEventsComponent
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
        RulesComponent,
        RuleHomeComponent,
        RuleDetailsComponent,
        RuleEventsComponent
    ]
})
export class RulesModule {
}