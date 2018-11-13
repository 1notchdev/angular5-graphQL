


import {
    Component, EventEmitter, Input, Output, ViewEncapsulation, ViewContainerRef,
    ComponentFactoryResolver, Type,
    ViewChild
} from "@angular/core";
import { ProjectService } from "../../../model/services/project-service.service";
import { ProjectInput } from "../../../model/entities/project";
import { UserService } from "../../../model/services/user-service.service";


@Component({
    selector: "project-creator",
    templateUrl: "./project-creator.component.html",
    styleUrls: ["./index.scss"]
})
export class ProjectCreatorComponent {

    @Input() public visible: boolean;

    @Output() readonly onClose = new EventEmitter<boolean>();
    @Output() readonly onLabelCreated = new EventEmitter<any>();

    private _projectName;

    constructor(private _projectService: ProjectService, private _userService: UserService) { }


    close() {
        this.visible = false;
        this.onClose.emit(this.visible);
    }

    private onSubmit() {
        this._projectService.createProject(new ProjectInput(this._projectName, this._userService.getOwnerId()))
            .subscribe(data => {
                this.onLabelCreated.emit();
                this.close();
            });

    }

}
