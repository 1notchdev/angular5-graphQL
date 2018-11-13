import { Injectable, Inject } from "@angular/core";
import notify from 'devextreme/ui/notify';

export abstract class NotificationService {
    abstract error(message: string)
    abstract success(mesage: string)
}

@Injectable()
export class DevExtremeNotificationService implements NotificationService {


    public error(message: string) {
        notify(message, 'error', 5000);
    }

    public success(message: string) {
        notify(message, 'success', 2500);
    }

}



