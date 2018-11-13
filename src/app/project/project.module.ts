import { NgModule } from '@angular/core';
import { ProjectComponent } from "./project.component";
import { LayoutModule } from "../layouts/layout.module";
import { ProjectRoutingModule } from "./project-routing.module";
import { CommonModule } from "@angular/common";



@NgModule({
    imports: [
        ProjectRoutingModule,
        LayoutModule,
        CommonModule,
    ],
    declarations: [ProjectComponent]
})
export class ProjectModule {
}