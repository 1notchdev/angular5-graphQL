import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { Subject } from "rxjs";
import { QueryService } from "./query-service.service";
import { Project, ProjectInput } from "../entities/project";
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppConfig, APP_CONFIG } from "../../app.config";

import { Observable } from 'rxjs/Observable';


const deleteProjectByID = gql`
mutation  deleteProjects($projectIDs: [String!]!) {
    deleteProjects(Ids: $projectIDs) {
        id
    }
}
`;

const createProjects = gql`
mutation  createProjects($projects: [ProjectInput!]!) {
    createProjects(Projects: $projects) {
        id
        name
    }
}
`;

const getProjectsQuery = gql`
    query Projects {
        Projects {
            id,
            name,
            dateCreated,
        }
    }
`;

export abstract class ProjectService {
    abstract getProjects(): any;
    abstract createProject(p: ProjectInput): any;
    abstract deleteProjectByID(projectId: string): any;
    abstract openProject(projectId: string)
}

@Injectable()
export class ApolloProjectService implements ProjectService {


    constructor(private _queryService: QueryService, private _httpClient: HttpClient, private _router: Router,
        @Inject(APP_CONFIG) private _config: AppConfig, private _errorService: ErrorHandler) { }

    getProjects(): any {
        return this._queryService.query(getProjectsQuery).pipe(map((result: any) => {
            return result.data.Projects;
        }));
    }
    createProject(p: ProjectInput) {
        return this._queryService.mutate(createProjects, {
            projects: [p]
        });
    };

    deleteProjectByID(projectId: string) {
        return this._queryService.mutate(deleteProjectByID, {
            projectIDs: [projectId]
        });
    }

    openProject(projectId: string) {
        this._httpClient.get(`${this._config.openProjectEndpoint}/${projectId}`, { responseType: 'text' })
            .subscribe(() => {
                this._router.navigate([`/project/${projectId}/aspects`]);
            }, err => this._handleError(err));
    }

    private _handleError(err: any) {
        this._errorService.handleError(err);
        return Observable.empty();
    }

}



