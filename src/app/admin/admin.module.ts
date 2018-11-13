import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LayoutModule } from '../layouts/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminProjectComponent } from './projects/admin-projects.component';
import {
    DxLookupModule, DxTreeViewModule, DxScrollViewModule, DxBoxModule, DxFormModule, DxValidatorModule,
    DxMenuModule, DxListModule, DxDataGridModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule, DxTagBoxModule
} from "devextreme-angular"
import { ProjectCreatorComponent } from './projects/creator/project-creator.component';
import { CoreDirectiveModule } from '../_directives/app.module';

@NgModule({
    imports: [
        CommonModule, AdminRoutingModule, LayoutModule,
        DxLookupModule, DxTreeViewModule, DxScrollViewModule, DxBoxModule, DxFormModule, DxValidatorModule,
        DxMenuModule, DxListModule, DxDataGridModule, DxTextBoxModule, DxPopupModule, DxTextAreaModule, DxTagBoxModule,
        CoreDirectiveModule
    ], exports: [
        AdminComponent,
        AdminDashboardComponent,
        ProjectCreatorComponent,
    ], declarations: [
        AdminComponent,
        AdminDashboardComponent,
        AdminProjectComponent,
        ProjectCreatorComponent,
    ]
})
export class AdminModule {

}