import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RequestOptions } from "@angular/http";
import { APP_CONFIG, AppConfig } from '../../app.config';
import { CookieService } from 'ngx-cookie-service';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch'

import { Observable } from 'rxjs/Observable';
import { Route, Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observer } from "rxjs";
import { User } from "@firebase/auth-types";



@Injectable()
export class AuthenticationService {
    private _firebaseAuth: FirebaseAuthService;
    private _backendAuth: BackendAuthService;
    constructor( @Inject(APP_CONFIG) private config: AppConfig, private _cookieService: CookieService,
        http: HttpClient,
        private _router: Router,
        private _fireAuth: AngularFireAuth) {
        this._firebaseAuth = new FirebaseAuthService(_fireAuth);
        this._backendAuth = new BackendAuthService(config, http);
    }

    public login(email: string, password: string) {
        return Observable.create((observer: Observer<any>) => {
            this._firebaseAuth.login(email, password)
                .then((user: any) => {
                    user.user.getIdToken().then(idToken => {
                        this._backendAuth.loginWithJwtToken(idToken).finally(() => {
                            this._firebaseAuth.logout();
                        }).subscribe(result => {
                            observer.next("Success");
                            observer.complete();
                        }, err => {
                            observer.error(err);
                        });
                    }).catch(e => {
                        observer.error(e);
                        this._firebaseAuth.logout();
                    });

                }).catch(err => {
                    observer.error(err);
                });
        });
    }

    public clearDataAndRedirect() {
        if (!this._router.url.startsWith("/login")) {
            this._cookieService.deleteAll();
            localStorage.removeItem('currentUser');
            this._router.navigate(['/login']);
        }
    }

    public isAuthenticated(): boolean {
        return (localStorage.getItem('currentUser') != null);
    }

    public logout() {
        try {
            this._backendAuth.logout().finally(() => {
                this.clearDataAndRedirect();
            }).subscribe();;
        } finally {
            this.clearDataAndRedirect();
        }
    }

    public createNewUser(email: string, password: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this._firebaseAuth.createUser(email, password).then((user: any) => {
                observer.next("success");
            }, error => {
                observer.error(error);
            })
        });
    }
}

class BackendAuthService {
    constructor( @Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) { }

    public loginWithJwtToken(jwtToken: string): Observable<any> {
        return this.http.post(this.config.loginEndpoint, { userId: 'FakeUserID', email: "fakeEmail@test.com", name: 'fakeName' })
            .map((user: any) => {
                // login successful if there's a jwt token in the response
                if (user && user.data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.data);
                }
            });
    }

    public logout() {
        return this.http.get(this.config.logoutEndpoint, { responseType: 'text' });
    }
}
class FirebaseAuthService {
    constructor(private readonly _fireAuth: AngularFireAuth) {
    };

    public login(email: string, password: string): Promise<any> {
        return this._fireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    public logout(): Promise<any> {
        return this._fireAuth.auth.signOut();
    }

    public createUser(email: string, password: string): Promise<any> {
        return this._fireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

}