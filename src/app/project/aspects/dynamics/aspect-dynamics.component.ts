import { Component, ViewEncapsulation, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlatRuleGroup, RuleGroup, Rule, RuleInput } from '../../../model/entities/rule';
import { RuleService } from '../../../model/services/rule-service.service';
import { RuleEditComponent } from '../creator/edit/rules/rules.component';

import { Observable } from 'rxjs/Observable';
import { Property, FlatPropertyGroup } from '../../../model/entities/property';



@Component({
    templateUrl: "./aspect-dynamics.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectDynamicsComponent implements OnInit, OnDestroy {
    private _sub: Subscription;
    private _ruleGroup: RuleGroup[] = [];
    private _popupVisible = false;
    private _aspectID: string;
    private _propertyList: Property[];

    dynamics = [];

    constructor(private _aspectService: AspectService, private _ruleService: RuleService, private _route: ActivatedRoute
        , private _errorService: ErrorHandler) {
    }

    private _refresh() {
        this._aspectID = this._route.parent.snapshot.params['id'];
        this._processRequest(this._aspectService.getRulesForAspect(this._aspectID), (ruleGroup: RuleGroup[]) => {
            this._ruleGroup = ruleGroup;
        })
    }

    ngOnInit() {
        this._sub = this._route.parent.params.subscribe(params => {
            this._refresh();
        });
        this._aspectService.getAspectWithParentsAndProperties(this._aspectID).subscribe((flatMap: FlatPropertyGroup) => this._propertyList = flatMap.properties);
    }

    private _loadingPanelVisible = false;

    private onDeleteRule(ruleId: string) {
        this._processRequest(this._ruleService.deleteRule(ruleId));
    }

    private onAddRule(ruleComponent: RuleEditComponent) {
        this._processRequest(this._ruleService.createRules([ruleComponent.getRule(this._aspectID)]));
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
        this._processRequest(this._ruleService.updateRule(rule.id, ruleInput), () => { }, err => {
            rule.enabled = enabled.oldValue;
        });
    }

    private onOpenRule(ruleId: string) {

    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }


}