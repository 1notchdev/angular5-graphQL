import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ProjectComponent } from './project/project.component';
import { ProjectModule } from './project/project.module';
import { LayoutModule } from './layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { AuthModule } from "./auth/auth.module";
import { QueryService, ApolloQueryService } from "./model/services/query-service.service"
import { APP_CONFIG, DEV_CONFIG } from './app.config';
import { AspectService, ApolloAspectService } from './model/services/aspect-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { CustomInterceptor } from './interceptor';
import { AdminModule } from './admin/admin.module';
import { ProjectService, ApolloProjectService } from './model/services/project-service.service';
import { NotificationService, DevExtremeNotificationService } from './model/services/notification-service.service';
import { AuthenticationService } from './auth/_services';
import { UserService } from './model/services/user-service.service';
import { GlobalErrorHandler } from './model/services/error-handler.service';
import { RuleService, ApolloRuleService } from './model/services/rule-service.service';
import { PropertyService, ApolloPropertyService } from './model/services/property-service.service';
import { ElementService, ApolloElementService } from './model/services/element-service.service';
import { ScenarioService, ApolloScenarioService } from './model/services/scenario.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        ProjectModule,
        AdminModule,
        AuthModule,
        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
    ],
    providers: [
        { provide: APP_CONFIG, useValue: DEV_CONFIG },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true
        },
        ScriptLoaderService,
        UserService,
        { provide: NotificationService, useClass: DevExtremeNotificationService },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: QueryService, useClass: ApolloQueryService },
        { provide: AspectService, useClass: ApolloAspectService },
        { provide: ProjectService, useClass: ApolloProjectService },
        { provide: RuleService, useClass: ApolloRuleService },
        { provide: PropertyService, useClass: ApolloPropertyService },
        { provide: ElementService, useClass: ApolloElementService },
        { provide: ScenarioService, useClass: ApolloScenarioService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }