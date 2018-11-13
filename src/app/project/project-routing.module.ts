import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProjectComponent } from "./project.component";
import { Routes } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "project/:id",
        "component": ProjectComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "elements",
                "loadChildren": "..\/project\/elements\/elements.module#ElementsModule"
            },
            {
                "path": "aspects",
                "loadChildren": "..\/project\/aspects\/aspects.module#AspectsModule"
            },
            {
                "path": "properties",
                "loadChildren": "..\/project\/properties\/properties.module#PropertiesModule"
            },
            {
                "path": "rules",
                "loadChildren": "..\/project\/rules\/rules.module#RulesModule"
            },
            {
                "path": "scenarios",
                "loadChildren": "..\/project\/scenarios\/scenarios.module#ScenariosModule"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }