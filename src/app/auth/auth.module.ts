import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { fakeBackendProvider } from './_helpers/index';
import { CookieService } from 'ngx-cookie-service';

import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './_services';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DEV_CONFIG } from '../app.config';
import { AngularFireModule } from 'angularfire2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({ withCredentials: true });
        return next.handle(request);
    }
}

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(DEV_CONFIG.firebase),
        AngularFireAuthModule,
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    entryComponents: [AlertComponent],
})

export class AuthModule {
}