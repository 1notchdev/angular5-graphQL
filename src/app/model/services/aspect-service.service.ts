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
    query Aspects {
        Aspects {
            id,
            name,
            description,
            kind,
            dateCreated,
            createdBy,
            dateModified,
            modifiedBy
        }
    }
`;

const getAspectGraph = gql`
    query Aspects {
        Aspects {
            id,
            name,
            parents {
                id
            },
            children {
                id
            }
        }
    }
`;

const getAspectsByID = gql`
    query  AspectsById($aspectIds: [String!]!) {
        AspectsById(Ids: $aspectIds) {
            id,
            name,
            description,
            dateCreated,
            createdBy,
            dateModified,
            modifiedBy
        }
    }
`;

const getUserNameByIds = gql`
    query  UsersById($userIds: [String!]!) {
        UsersById(Ids: $userIds) {
            id,
            name,
        }
    }
`;

const aspectsWithParentsAndProperties = gql`
query AspectsById($aspectIds: [String!]!) {
    AspectsById(Ids: $aspectIds) {
        id,
        name,
        ancestors {
            id,
            name,
            properties {
                id,
                name,
                kind
            }
        },
        properties {
          id,
          name,
          kind
        }
    }
}
`;

const aspectPropertyGraph = gql`
query AspectsById($aspectIds: [String!]!) {
    AspectsById(Ids: $aspectIds) {
        id,
        name,
        ancestors {
            id,
            name,
            properties {
                id,
                name,
            }
            parents {
                id
            }
        },
        parents {
            id
        },
        properties {
          id,
          name,
        }
    }
}
`;



const ancestorsForAspects = gql`
query AspectsById($aspectIds: [String!]!) {
    AspectsById(Ids: $aspectIds) {
        ancestors {
            id,
            name,
        },
        descendants {
            id,
            name
        }
    }
}
`;
const rulesForAspect = gql`
query AspectsById($aspectIds: [String!]!) {
    AspectsById(Ids: $aspectIds) {
        ancestors {
            rules {
                id,
                formula,
                enabled,
                property {
                    id,
                    name,
                },
                aspect {
                    id
                }
            }
        },
        rules {
            id,
            formula,
            enabled,
            aspect {
                id
            },
            property {
                id,
                name,
            }
        }
    }
}
`;
const aspectParents = gql`
query AspectsById($aspectIds: [String!]!) {
    AspectsById(Ids: $aspectIds) {
       parents {
        id,name,
       },
    }
}
`

const createAspect = gql`
mutation  createAspects($aspects: [AspectInput!]!) {
    createAspects(Aspects: $aspects) {
        id
    }
}
`;

const addParentsToAspect = gql`
mutation  addParentsToAspect($parentIds: [String!]!, $aspectId: String!) {
    addParentsToAspect(sourceIds: $parentIds, targetId: $aspectId) {
        id
    }
}
`;

const deleteAspect = gql`
mutation  deleteAspects($aspects: [String!]!) {
    deleteAspects(Ids: $aspects) {
        id
    }
}
`;

export abstract class AspectService {
    abstract getAspects(): any;
    abstract createAspect(aspect: AspectInput): any;
    abstract deleteAspect(aspectId: string);
    abstract addParentsToAspect(parentIds: string[], aspectId: string);
    abstract addParentsToAspects(parentIds: string[], aspects: Aspect[]);
    abstract getAspectByID(aspectId: string);
    abstract getAspectWithParentsAndProperties(aspectId: string): any;
    abstract getParentAspects(aspectId: string): any;
    abstract getUniqeueAncestorsAndDescendantsForAspects(aspectIds: string[]): any;
    abstract getAspectsNameOnly(): any;
    abstract getRulesForAspect(aspectId: string): any;
    abstract getAspectPropertyGraph(aspectId: string): Observable<AspectPropertyGraph>;
    abstract getAspectGraph(): Observable<AspectGraph>;

}

@Injectable()
export class ApolloAspectService implements AspectService {

    constructor(private _queryService: QueryService) { }

    public getAspects() {
        return this._queryService.query(getAspectsQuery).pipe(map((result: any) => {
            return result.data.Aspects;
        }));
    }

    public createAspect(aspectInput: AspectInput) {
        return this._queryService.mutate(createAspect, {
            aspects: [aspectInput]
        }).pipe(map((result: any) => result.data.createAspects[0]));
    }

    public deleteAspect(aspectId: string) {
        return this._queryService.mutate(deleteAspect, {
            aspects: [aspectId]
        })
    }

    public addParentsToAspect(parentIds: string[], aspectId: string) {
        return this._queryService.mutate(addParentsToAspect, {
            parentIds: parentIds,
            aspectId: aspectId
        });
    }

    public addParentsToAspects(parentIds: string[], aspects: Aspect[]) {
        return Observable.merge(
            ...aspects.map(aspect => {
                return Observable.create((observer: Observer<any>) => {
                    this.addParentsToAspect(parentIds, aspect.id).finally(() => observer.complete()).subscribe(() => {
                        observer.next({
                            success: true,
                            aspect: aspect
                        })
                    }, err => {
                        observer.next({
                            success: false,
                            aspect: aspect
                        })
                    });
                });
            })
        );


    }

    public getAspectByID(aspectId: string) {
        return this._queryService.query(getAspectsByID, {
            aspectIds: [aspectId]
        }).flatMap(
            (result: any) => {
                if (result.data.AspectsById.length === 1) {
                    const aspect = result.data.AspectsById[0];
                    const asp = new Aspect();
                    asp.id = aspect.id;
                    asp.dateCreated = new Date(aspect.dateCreated);
                    asp.dateModified = new Date(aspect.dateModified);
                    asp.name = aspect.name;
                    asp.description = aspect.description;
                    asp.modifiedBy = aspect.modifiedBy;
                    asp.createdBy = aspect.createdBy;
                    return this._queryService.query(getUserNameByIds, {
                        userIds: [asp.createdBy, asp.modifiedBy]
                    }).map((result2: any) => {
                        if (result2.data.UsersById.length > 0) {
                            const nameMap = new Map<string, string>();
                            result2.data.UsersById.forEach(user => nameMap.set(user.id, user.name));
                            asp.modifiedBy = nameMap.get(asp.modifiedBy) || asp.modifiedBy;
                            asp.createdBy = nameMap.get(asp.createdBy) || asp.createdBy;
                        }
                        return asp;
                    });
                }
                else {
                    return Observable.of(new Aspect());
                }
            });
    }

    public getAspectWithParentsAndProperties(aspectId: string): any {
        return this._queryService.query(aspectsWithParentsAndProperties, {
            aspectIds: [aspectId]
        }).pipe(map((result: any) => {
            const results = result.data.AspectsById;
            const propertyGroup = new FlatPropertyGroup();
            if (results.length === 1) {
                const aspect = results[0];
                propertyGroup.addGroup(aspect.id, "Current Aspect");
                aspect.properties.forEach(p => {
                    propertyGroup.addProperty(this._mapProperty(p, aspect.id));
                })
                aspect.ancestors.forEach(parentAspect => {
                    propertyGroup.addGroup(parentAspect.id, parentAspect.name);
                    parentAspect.properties.forEach(p => {
                        propertyGroup.addProperty(this._mapProperty(p, parentAspect.id));
                    });
                })
            }
            return propertyGroup;
        }));
    }

    private _addElementsToGraph(graph: AspectPropertyGraph, aspect: Aspect, isRoot = false) {
        graph.addAspect(aspect.id, aspect.name, isRoot);
        aspect.parents.forEach(parentAspect => {
            graph.addAspectLinkAspect(aspect.id, parentAspect.id);
        });
        aspect.properties.forEach(property => {
            graph.addProperty(property.id, property.name);
            graph.addAspectLinkProperty(property.id, aspect.id);
        });
    }

    public getAspectPropertyGraph(aspectId: string): Observable<AspectPropertyGraph> {
        return this._queryService.query(aspectPropertyGraph, {
            aspectIds: [aspectId]
        }).pipe(map((result: any) => {
            const results = result.data.AspectsById;
            const graph = new AspectPropertyGraph();
            if (results.length === 1) {
                const aspect = results[0];
                this._addElementsToGraph(graph, aspect, true);
                aspect.ancestors.forEach(ancestorAspect => this._addElementsToGraph(graph, ancestorAspect));
            }
            return graph;
        }));
    };

    public getAspectGraph(): Observable<AspectGraph> {
        return this._queryService.query(getAspectGraph).pipe(map((result: any) => {
            const results = result.data.Aspects;
            const graph = new AspectGraph();
            results.forEach(aspect => {
                graph.addAspect(aspect);
            });
            return graph;
        }));
    }


    public getParentAspects(aspectId: string) {
        return this._queryService.query(aspectParents, { aspectIds: [aspectId] }).pipe(map((result: any) => {
            const results = result.data.AspectsById;
            if (results.length === 1) {
                return results[0].parents.map(aspect => {
                    const p = new Aspect();
                    p.id = aspect.id;
                    p.name = aspect.name;
                    return p;
                });
            }
            else return [];
        }));
    }

    public getUniqeueAncestorsAndDescendantsForAspects(aspectIds: string[]) {
        return this._queryService.query(ancestorsForAspects, { aspectIds: aspectIds }).pipe(map((result: any) => {
            const results = result.data.AspectsById;
            const idSet = new Set();
            const uniques = [].concat(...results.map(aspect => {
                return this._getNewAspectsOnly(idSet, aspect.ancestors)
                    .concat(this._getNewAspectsOnly(idSet, aspect.descendants));
            }));
            return uniques;
        }));
    }

    private _getNewAspectsOnly(idSet: Set<string>, aspects: any[]): Aspect[] {
        return aspects.filter(aspect => {
            const isNew = !idSet.has(aspect.id);
            if (isNew) idSet.has(aspect.id);
            return isNew;
        }).map(aspect => {
            const p = new Aspect();
            p.id = aspect.id;
            p.name = aspect.name;
            return p;
        });
    }

    public getAspectsNameOnly() {
        return this._queryService.query(getAspectsQuery).pipe(map((result: any) => {
            return result.data.Aspects.map(aspect => {
                const p = new Aspect();
                p.id = aspect.id;
                p.name = aspect.name;
                return p;
            });
        }));
    }

    public getRulesForAspect(aspectId: string) {
        return this._queryService.query(rulesForAspect, { aspectIds: [aspectId] }).pipe(map((result: any) => {
            const results = result.data.AspectsById;
            const ruleGroup = new FlatRuleGroup();
            if (results.length === 1) {
                this._addRulesToGroup(results[0].rules.map(rule => this._mapRule(rule)), ruleGroup);
                results[0].ancestors.forEach(ancestor => {
                    this._addRulesToGroup(ancestor.rules.map(rule => this._mapRule(rule)), ruleGroup);
                });

            }
            return ruleGroup.ruleGroups();
        }));
    }
    private _addRulesToGroup(rules: Rule[], ruleGroup: FlatRuleGroup) {
        rules.forEach(r => {
            ruleGroup.addRule(r);
        });
    }
    private _mapRule(rule: any) {
        const p = new Rule();
        p.id = rule.id;
        p.formula = rule.formula.split('@')[0];
        p.property = new Property();
        p.property.id = rule.property[0].id;
        p.property.name = rule.property[0].name;
        p.enabled = rule.enabled;
        p.aspect = new Aspect();
        p.aspect.id = rule.aspect[0].id;
        return p;
    }
    private _mapProperty(p: any, aspectId: string) {
        const prop = new Property();
        prop.aspectId = aspectId;
        prop.name = p.name;
        prop.kind = p.kind;
        prop.id = p.id;
        return prop;
    }


}