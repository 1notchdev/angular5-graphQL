import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './model/services/notification-service.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/_services';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/timeout';
import { Helpers } from './helpers';
import { APP_CONFIG, AppConfig } from './app.config';
import { TimeoutError } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    private _requests = [];
    constructor( @Inject(APP_CONFIG) private _config: AppConfig, private _authService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._toggleLoadingIndicator(request, false);
        request = request.clone({ withCredentials: true });
        return next.handle(request).timeout(this._config.defaultTimeout).catch(err => {
            if (err instanceof HttpErrorResponse && err.status === 403) {
                this._authService.clearDataAndRedirect();
            }
            return Observable.throw(err);
        }).finally(() => {
            this._toggleLoadingIndicator(request, true);
        });
    }

    private _toggleLoadingIndicator(request: HttpRequest<any>, completed: boolean) {
        if (!completed) {
            this._requests.push(request);
        }
        else {
            var index = this._requests.indexOf(request);
            this._requests.splice(index, 1);
        }
        Helpers.setLoading(this._requests.length > 0);
    }
}