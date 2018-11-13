import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../../model/services/project-service.service';
import { Project } from '../../model/entities/project';



@Component({
    selector: "admin-projects-page",
    templateUrl: "./admin-projects.component.html",
    styleUrls: ["./admin-projects.scss"],
})
export class AdminProjectComponent implements OnInit {

    private popupVisible = false;
    private _projectList: Project[];
    constructor(private _projectService: ProjectService) { }

    ngOnInit() {
        this._refreshData();
    }

    private _refreshData() {
        this._projectService.getProjects().subscribe(data => {
            this._projectList = data;
        });
    }

    showPopUp() {
        this.popupVisible = true;
    }

    private onLabelCreated(newLabel: any) {
        this._refreshData();
    }

    private onDelete(projectId: string) {
        this._projectService.deleteProjectByID(projectId).subscribe(data => {
            this._refreshData();
        });
    }

    private onOpenProject(projectId: string) {
        this._projectService.openProject(projectId);
    }

}