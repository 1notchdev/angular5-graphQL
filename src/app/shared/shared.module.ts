import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DxLookupModule, DxTreeViewModule, DxScrollViewModule, DxBoxModule, DxDataGridModule,
    DxAccordionModule, DxTabPanelModule, DxTagBoxModule, DxPivotGridModule, DxListModule, DxButtonModule, DxPopupModule
} from "devextreme-angular";
import { PropertiesModule } from "./properties/properties.module";
import { EventsLogComponent } from "./events-log.component";
import { ItemsListComponent } from "./items-list.component";
import { RulesListComponent } from './rules/rules-list.component';
import { RulesModule } from './rules/rules.module';
import { CoreDirectiveModule } from '../_directives/app.module';
import { AspectChooserComponent } from './aspect/aspect-chooser.component';
import { EditablePivotGridComponent } from './editable-pivot-grid/editable-pivot-grid.component';
import { RuleEditorComponent } from './rule-editor/rule-editor.component';
import { RuleEditorModule } from './rule-editor/rule-editor.module';


@NgModule({
    imports: [
        CommonModule,
        DxLookupModule,
        DxScrollViewModule,
        DxBoxModule,
        DxListModule,
        DxTagBoxModule,
        DxButtonModule,
        DxPivotGridModule,
        PropertiesModule,
        DxDataGridModule,
        DxPopupModule,
        RulesModule,
        CoreDirectiveModule,
        RuleEditorModule
    ],
    exports: [
        ItemsListComponent,
        AspectChooserComponent,
        PropertiesModule,
        RulesModule,
        RuleEditorModule,
        EventsLogComponent,
        EditablePivotGridComponent,
    ],
    declarations: [
        ItemsListComponent, EventsLogComponent, AspectChooserComponent, EditablePivotGridComponent
    ]
})
export class SharedModule {


}