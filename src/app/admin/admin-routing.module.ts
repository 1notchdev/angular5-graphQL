import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { Routes } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";
import { AdminDashboardComponent } from "./dashboard/admin-dashboard.component";

const routes: Routes = [
    {
        "path": "admin",
        "component": AdminComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "dashboard",
                "component": AdminDashboardComponent
            },
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
export class AdminRoutingModule { }