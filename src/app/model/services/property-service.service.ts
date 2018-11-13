import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Subject } from "rxjs";
import { PropertyInput, FlatPropertyGroup, Property } from "../entities/property";
import { QueryService } from "./query-service.service";
import { AnimationKeyframesSequenceMetadata } from "@angular/core/src/animation/dsl";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';

const getPropertysQuery = gql`
    query Properties {
        Properties {
            id,
            name,
            kind,
            dateCreated,
            aspect {
                id,
                name
            }
        }
    }
`;

const createProperty = gql`
mutation  createProperties($Properties: [PropertyInput!]!) {
    createProperties(Properties: $Properties) {
        id
    }
}
`;

const deleteProperty = gql`
mutation  deleteProperties($Ids: [String!]!) {
    deleteProperties(Ids: $Ids) {
        id
    }
}
`;

const deletePropertyFromAspect = gql`
mutation  removePropertiesFromAspect($propertyIds: [String!]!, $aspectId: String!) {
    removePropertiesFromAspect(sourceIds: $propertyIds, targetId: $aspectId) {
        id
    }
}
`;



export abstract class PropertyService {
    abstract getProperties(): any;
    abstract createProperties(properties: PropertyInput[]): any;
    abstract deleteProperty(propertyIds: string[]): any;
    abstract deletePropertyFromAspect(propertyId: string, aspectId: string): any;
    abstract updateValueChangesForProperty(values: any[], propertyId: string): Observable<any[]>;
}

@Injectable()
export class ApolloPropertyService implements PropertyService {

    constructor(private _queryService: QueryService) { }

    public getProperties() {
        return this._queryService.query(getPropertysQuery).pipe(map((result: any) => {
            const properties = result.data.Properties;
            const propertyGroup = new FlatPropertyGroup();
            properties.forEach(p => {
                const prop = this._mapProperty(p);
                propertyGroup.addProperty(prop);
                propertyGroup.addGroup(prop.aspectId, prop.aspectName);
            })
            return propertyGroup;
        }));


    }

    private _mapProperty(p: any) {
        const prop = new Property();
        prop.aspectId = p.aspect[0].id;
        prop.aspectName = p.aspect[0].name;
        prop.dateCreated = new Date(p.dateCreated);
        prop.name = p.name;
        prop.kind = p.kind;
        prop.id = p.id;
        return prop;
    }

    public createProperties(props: PropertyInput[]) {
        return this._queryService.mutate(createProperty, {
            Properties: props
        }).pipe(map((result: any) => result.data.Properties));
    }

    public deleteProperty(propertyIds: string[]) {
        return this._queryService.mutate(deleteProperty, {
            Ids: propertyIds
        });
    }

    public deletePropertyFromAspect(propertyId: string, aspectId: string) {
        return this._queryService.mutate(deletePropertyFromAspect, {
            propertyIds: [propertyId],
            aspectId: aspectId
        });
    }

    public updateValueChangesForProperty(values: any[], propertyId: string): Observable<any[]> {
        console.log("Updating property value changes");
        console.log(values);
        return Observable.of([{
            "id": 1,
            "region": "North America",
            "country": "USA",
            "city": "New York",
            "amount": 1740,
            "date": "2013/01/06"
        }, {
            "id": 2,
            "region": "North America",
            "country": "USA",
            "city": "Los Angeles",
            "amount": 850,
            "date": "2013/01/13"
        }, {
            "id": 3,
            "region": "North America",
            "country": "USA",
            "city": "Denver",
            "amount": 2235,
            "date": "2013/01/07"
        }, {
            "id": 72,
            "region": "Asia",
            "country": "CHN",
            "city": "Beijing",
            "amount": 1200,
            "date": "2013/03/04"
        }]);
    }


}