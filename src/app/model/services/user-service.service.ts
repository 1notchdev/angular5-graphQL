import { Injectable, Inject } from "@angular/core";

@Injectable()
export class UserService {

    public getOwnerId() {
        return localStorage.getItem("currentUser");
    }
}