import { Injectable, ErrorHandler } from "@angular/core";
import { NotificationService } from "./notification-service.service";
import 'rxjs/observable/throw';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private _notifService: NotificationService) {
    }

    handleError(error: any): void {
        console.log(error || error.message || error.stack || error);
        this._notifService.error(error.message || error.stack || error);
    }
}