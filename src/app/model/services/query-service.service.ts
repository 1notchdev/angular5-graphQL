import { Injectable, Inject, ErrorHandler } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { variable } from "@angular/compiler/src/output/output_ast";
import { NotificationService } from "./notification-service.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';


export abstract class QueryService {
    abstract query(query: any, variables?: any): any;
    abstract mutate(mutation: any, variables: any, showError?: boolean): any;
}

@Injectable()
export class ApolloQueryService implements QueryService {

    constructor( @Inject(APP_CONFIG) config: AppConfig, private client: Apollo, private httpLink: HttpLink, private _errorService: ErrorHandler, private _notifService: NotificationService) {
        console.log(config.graphqlEndpoint);
        client.create({
            link: httpLink.create({ uri: config.graphqlEndpoint }),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'none',
                },
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'none',
                },
                mutate: {
                    errorPolicy: 'none'
                }
            }
        });
    }

    public query(query: any, variables = {}): any {
        return this.client.query({
            query: query,
            variables: variables
        }).catch(err => {
            this._errorService.handleError(err);
            return Observable.empty();
        });
    }

    public mutate(mutation: any, variables: any, showError = true): any {
        return this.client.mutate({
            mutation: mutation,
            variables: variables
        }).map(data => {
            this._notifService.success("Successful request sent");
            return data;
        }).catch(err => {
            if (showError) this._errorService.handleError(err);
            return Observable.throw(err);
        });
    }
}