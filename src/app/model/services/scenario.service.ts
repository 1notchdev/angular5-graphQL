import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subject, Observer } from "rxjs";
import { AspectInput, Aspect } from "../entities/aspect";
import { QueryService } from "./query-service.service";
import { AnimationKeyframesSequenceMetadata } from "@angular/core/src/animation/dsl";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { FlatPropertyGroup, Property } from "../entities/property";
import { Rule, FlatRuleGroup } from "../entities/rule";
import { TaskQueue } from "../utils/task-queue";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { AspectPropertyGraph, AspectGraph } from "../utils/graph";

const getAspectsQuery = gql`
    query Scenarios {
        Scenarios {
            id,
            name,
            color,
            dateCreated,
            createdBy,
            dateModified,
            modifiedBy
        }
    }
`;



export abstract class ScenarioService {
    abstract get(): any;

}

@Injectable()
export class ApolloScenarioService implements ScenarioService {

    constructor(private _queryService: QueryService) { }

    public get() {
        return this._queryService.query(getAspectsQuery).pipe(map((result: any) => {
            return result.data.Aspects;
        }));
    }


}