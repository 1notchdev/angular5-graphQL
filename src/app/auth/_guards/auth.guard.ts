import { Injectable, ErrorHandler } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Observer } from "rxjs/Rx";
import { AuthenticationService } from "../_services";


@Injectable()
export class AuthGuard implements CanActivate {
    private readonly _returnUrl = "/admin/dashboard";
    constructor(private _router: Router, private _authService: AuthenticationService, private _errorHandler: ErrorHandler) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        try {
            if (this._authService.isAuthenticated()) {
                // logged in so return true
                return true;
            }
            // error when verify so redirect to login page with the return url
            this._router.navigate(['/login'], { queryParams: { returnUrl: this._returnUrl } });
            return false;
        } catch (e) {
            this._router.navigate(['/login'], { queryParams: { returnUrl: this._returnUrl } });
            return false;
        }
    }
}