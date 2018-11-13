import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subject } from "rxjs";
import { RuleInput, Rule } from "../entities/rule";
import { QueryService } from "./query-service.service";
import { AnimationKeyframesSequenceMetadata } from "@angular/core/src/animation/dsl";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const getRulesQuery = gql`
    query Rules {
        Rules {
            id,
            name,
            kind,
            description,
            dateCreated,
        }
    }
`;

const createRule = gql`
mutation  createRules($Rules: [RuleInput!]!) {
    createRules(Rules: $Rules) {
        id
    }
}
`;
const addRulesToAspect = gql`
mutation  addRulesToAspect($ruleIds: [String!]!, $aspetId: String!) {
    addRulesToAspect(sourceIds: $ruleIds, targetId: $aspectId) {
        id
    }
}
`;

const deleteRule = gql`
mutation  deleteRules($ruleIds: [String!]!) {
    deleteRules(Ids: $ruleIds) {
        id
    }
}
`;

const deleteRulesFromAspect = gql`
mutation  deleteRules($ruleIds: [String!]!) {
    deleteRules(Ids: $ruleIds) {
        id
    }
}
`;
const updateRule = gql`
mutation  updateRules($ruleId: String!, $ruleInput: RuleInput!) {
    updateRules(updateId: $ruleId, Rules: $ruleInput) {
        id
    }
}
`;


export abstract class RuleService {
    abstract getRules(): any;
    abstract createRules(Rules: RuleInput[]): any;
    abstract addRulesToAspect(ruleIds: string[], aspectId: string): any;
    abstract deleteRule(ruleId: string): any;
    abstract updateRule(ruleId: string, ruleInput: RuleInput): any;
    abstract getFunctions(): any;
}

@Injectable()
export class ApolloRuleService implements RuleService {

    constructor(private _queryService: QueryService) { }

    public getRules() {
        return this._queryService.query(getRulesQuery).pipe(map((result: any) => {
            return result.data.Rules;
        }));
    }

    public createRules(RuleInputs: RuleInput[]) {
        return this._queryService.mutate(createRule, {
            Rules: RuleInputs
        }).pipe(map((result: any) => result.data.Rules));
    }

    public addRulesToAspect(ruleIds: string[], aspectId: string) {
        return this._queryService.mutate(addRulesToAspect, {
            ruleIds: ruleIds,
            aspectId: aspectId
        });
    }

    public deleteRule(ruleId: string) {
        return this._queryService.mutate(deleteRule, {
            ruleIds: [ruleId]
        });
    }

    public updateRule(ruleId: string, ruleInput: RuleInput) {
        return this._queryService.mutate(updateRule, {
            ruleId: ruleId,
            ruleInput: ruleInput
        });
    }

    public getFunctions(){
        return Observable.of([
            {   
                id: "2376845e-9d49-4bef-bf14-b971e825eb17",
                name: "functionA"
            },
            {   
                id: "3376845e-9d49-4cfa-bf44-b971e925eb17",
                name: "functionB"
            },
            {   
                id: "3376845e-9d49-1bda-bf62-b971e925eb17",
                name: "functionC"
            },
            {   
                id: "2376845a-9d49-4bdf-bf65-b971e925eb17",
                name: "functionD"
            },
            {   
                id: "2376645e-7d49-4bda-bf64-b971e925eb17",
                name: "functionE"
            },
        ])
    }


}