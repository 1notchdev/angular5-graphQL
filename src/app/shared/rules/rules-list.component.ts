import { Component, ViewEncapsulation, OnInit, OnDestroy, ErrorHandler, Input } from '@angular/core';
import { AspectService } from '../../model/services/aspect-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlatRuleGroup, RuleGroup, Rule, RuleInput } from '../../model/entities/rule';
import { RuleService } from '../../model/services/rule-service.service';
import { Observable } from 'rxjs/Observable';
import { Property, FlatPropertyGroup } from '../../model/entities/property';



@Component({
    selector: "rules-list",
    templateUrl: "./rules-list.component.html",
    styleUrls: ["./index.scss"]
})
export class RulesListComponent {
    private _sub: Subscription;

    @Input()
    public ruleGroups: RuleGroup[] = [];
    private _popupVisible = false;

    constructor(private _aspectService: AspectService, private _ruleService: RuleService, private _route: ActivatedRoute
        , private _errorService: ErrorHandler) {
    }

    private _refresh() {
        //do nothing;
        return;
    }


    private _loadingPanelVisible = false;

    private onDeleteRule(rule: Rule) {
        this._processRequest(this._ruleService.deleteRule(rule.id));
    }

    private _processRequest(request: Observable<any>, success?: Function, errHandler?: Function) {
        this._loadingPanelVisible = true;
        request.finally(() => {
            this._loadingPanelVisible = false;
        }).subscribe(data => {
            if (!success) this._refresh();
            else success(data);
        }, err => {
            if (errHandler) errHandler(err);
            else this._errorService.handleError(err);
        });
    }

    private onEnableOrDisableRule(enabled: any, rule: Rule) {
        const ruleInput = new RuleInput(rule.formula, rule.aspect.id, rule.property.id, enabled.value);
        this._processRequest(this._ruleService.updateRule(rule.id, ruleInput), () => {
            rule.enabled = enabled.value;
        }, err => {
            rule.enabled = enabled.oldValue;
        });
    }

    private onOpenRule(ruleId: string) {

    }

}