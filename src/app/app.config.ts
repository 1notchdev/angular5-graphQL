import { InjectionToken } from '@angular/core';
function url(path) {
    return 'http://api.halansary.com/' + path;
}
export interface AppConfig {
    graphqlEndpoint: string;
    loginEndpoint: string;
    logoutEndpoint: string
    defaultTimeout: number;
    openProjectEndpoint: string;
    firebase: any;
}

export const DEV_CONFIG: AppConfig = {
    graphqlEndpoint: url('graphQl'),
    loginEndpoint: url('login'),
    logoutEndpoint: url('logout'),
    openProjectEndpoint: url('projects'),
    defaultTimeout: 10000,
    firebase: {
        apiKey: "AIzaSyBlgPVq2WQqwenNXDOTZV5gbS4TMAZhXu8",
        authDomain: "stronghold-171801.firebaseapp.com",
        databaseURL: "https://stronghold-171801.firebaseio.com",
        projectId: "stronghold-171801",
        storageBucket: "stronghold-171801.appspot.com",
        messagingSenderId: "348484208670"
    }

};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');