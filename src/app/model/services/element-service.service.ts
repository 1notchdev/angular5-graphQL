import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subject, Observer } from "rxjs";
import { ElementInput, Element } from "../entities/element";
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
import { ElementDataSource } from "../utils/element-data-source";
import { Aspect } from "../entities/aspect";

const getElementsQuery = gql`
    query Elements {
        Elements {
            id,
            name,
            dateCreated,
        }
    }
`;

const getElementsByID = gql`
    query  ElementsById($ElementIds: [String!]!) {
        ElementsById(Ids: $ElementIds) {
            id,
            name,
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

const ElementsWithParentsAndProperties = gql`
query ElementsById($ElementIds: [String!]!) {
    ElementsById(Ids: $ElementIds) {
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

const aspectsForElements = gql`
query ElementsById($elementIds: [String!]!) {
    ElementsById(Ids: $elementIds) {
        aspects {
            id,
            name,
            ancestors {
                id,
                name,
                properties {
                    id,
                    name,
                    kind
                },
                rules{
                    id,
                    aspect {id},
                    property {id, name},
                    formula,
                    enabled,
                }
                parents {
                    id,
                    name
                }
            }
            parents {
                id,
                name
            },
            properties {
                id,
                name,
                kind
            },
            rules{
                id,
                aspect {id},
                property {id, name},
                formula,
                enabled,
            }
        },
    }
}
`;

const getAspectOfElement = gql`
query ElementsById($elementIds: [String!]!) {
    ElementsById(Ids: $elementIds) {
       aspects {
        id,name,
       },
    }
}
`

const createElements = gql`
mutation  createElements($elements: [ElementInput!]!) {
    createElements(Elements: $elements) {
        id,
        name
    }
}
`;

const addAspectsToElement = gql`
mutation  addAspectsToElement($aspectIds: [String!]!, $elementId: String!) {
    addAspectsToElement(sourceIds: $aspectIds, targetId: $elementId) {
        id
    }
}
`;

const deleteAspectsOfElement = gql`
mutation removeAspectsFromElement($aspectIds: [String!]!, $elementId: String!){
    removeAspectsFromElement(sourceIds: $aspectIds, targetId: $elementId){
        id
    }
} 
`

const deleteElement = gql`
mutation  deleteElements($Elements: [String!]!) {
    deleteElements(Ids: $Elements) {
        id
    }
}
`;

export abstract class ElementService {
    abstract getElements(): any;
    abstract createElements(Element: ElementInput[]): any;
    abstract addAspectsToElements(aspectIds: string[], elements: Element[]): any;
    abstract addAspectsToElement(aspectIds: string[], elementId: string): Observable<any>;
    abstract deleteElements(...ElementIds: string[]);
    abstract getElementByID(ElementId: string);
    abstract aspectsForElement(elementId: string): Observable<ElementDataSource>;
    abstract getAspectListOfElement(elementId: string): Observable<Aspect[]>;
    abstract removeAspectsForElement(aspectIds: string[], elementId: string): Observable<any>;

}

@Injectable()
export class ApolloElementService implements ElementService {

    constructor(private _queryService: QueryService) { }

    public getElements() {
        return this._queryService.query(getElementsQuery).pipe(map((result: any) => {
            return result.data.Elements;
        }));
    }

    public createElements(elements: ElementInput[]) {
        return this._queryService.mutate(createElements, {
            elements: elements
        }).pipe(map((result: any) => result.data.createElements));
    }

    public addAspectsToElements(aspectIds: string[], elements: Element[]) {
        return Observable.merge(...elements.map((e: Element) => Observable.create(obs => {
            this.addAspectsToElement(aspectIds, e.id).finally(() => {
                obs.complete();
            }).subscribe(success => {
                return obs.next({ success: true, element: e });
            }, err => {
                return obs.next({ success: false, element: e });
            })
        })));

    }

    public addAspectsToElement(aspectIds: string[], elementId: string) {
        return this._queryService.mutate(addAspectsToElement, {
            aspectIds: aspectIds,
            elementId: elementId
        })
    }

    public deleteElements(...elementIds: string[]) {
        return this._queryService.mutate(deleteElement, {
            Elements: elementIds
        })
    }

    public getElementByID(ElementId: string) {
        return this._queryService.query(getElementsByID, {
            ElementIds: [ElementId]
        }).flatMap(
            (result: any) => {
                if (result.data.ElementsById.length === 1) {
                    const element = result.data.ElementsById[0];
                    const asp = new Element();
                    asp.id = element.id;
                    asp.dateCreated = new Date(element.dateCreated);
                    asp.dateModified = new Date(element.dateModified);
                    asp.name = element.name;
                    asp.modifiedBy = element.modifiedBy;
                    asp.createdBy = element.createdBy;
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
                    return Observable.of(new Element());
                }
            });
    }

    public aspectsForElement(elementId: string): Observable<ElementDataSource> {
        return this._queryService.query(aspectsForElements, {
            elementIds: [elementId]
        }).map((result: any) => {
            if (result.data.ElementsById.length == 1) {
                return new ElementDataSource(result.data.ElementsById[0]);
            }
            else {
                return null;
            };


        });
    }

    public getAspectListOfElement(elementId: string): Observable<Aspect[]> {
        return this._queryService.query(getAspectOfElement, {
            elementIds: [elementId]
        }).map((result: any) => {
            if (result.data.ElementsById.length == 1) {
                return result.data.ElementsById[0].aspects.map(a => {
                    const p = new Aspect();
                    p.id = a.id;
                    p.name = a.name;
                    return p;
                });
            }
            else {
                return [];
            };


        });
    }

    public removeAspectsForElement(aspectIds: string[], elementId: string) {
        return this._queryService.mutate(deleteAspectsOfElement, {
            elementId: elementId,
            aspectIds: aspectIds
        });
    }

}