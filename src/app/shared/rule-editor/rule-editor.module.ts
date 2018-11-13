import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RuleEditorComponent } from "./rule-editor.component";
import { monacoConfig } from './monaco-editor/config';

@NgModule({
    imports: [
        MonacoEditorModule.forRoot(monacoConfig),
        FormsModule,
    ],
    exports: [
        RuleEditorComponent
    ],
    declarations: [
        RuleEditorComponent
    ]
})
export class RuleEditorModule {


}