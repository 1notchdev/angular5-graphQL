import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: "./rule-events.component.html",
    styleUrls: ["./index.scss"]
})
export class RuleEventsComponent {


    element = {
        fingerPrint: "583c446d-2325-4842-8451-2e2868e100e3",
        name: "Rooya Holding",
        active: true,
        description: "",
        created: "+1(213) 555-9392",
        createdBy: "jheart@dx-email.com",
        lastModified: "jheart_DX_skype",
        lastModifiedBy: "Haitham",
    };
    aspects;

}