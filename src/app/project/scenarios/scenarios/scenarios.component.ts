import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Scenario } from '../../../model/entities/scenario';
import { Subscription } from 'rxjs';
import { ScenarioService } from '../../../model/services/scenario.service';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
    templateUrl: "./scenarios.component.html",
    styleUrls: ["./scenarios.component.scss"]
})
export class ScenariosComponent implements OnInit {
    private _scenarios: Scenario[];
    private _popupVisible = false;
    private _selectedProperties = [];

    constructor(private _scenarioService: ScenarioService) {

    }

    ngOnInit() {
        this._refresh();
    }

    private _refresh() {
        this._scenarioService.get().subscribe((scenarios: Scenario[]) => {
            this._scenarios = scenarios;
            console.log(this._scenarios);
        });
    }
    


}