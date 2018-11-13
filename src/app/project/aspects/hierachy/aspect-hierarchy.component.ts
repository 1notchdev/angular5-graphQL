declare var window: any;
declare var require: any;
const cytoscape = require('cytoscape');

import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AspectPropertyGraph } from '../../../model/utils/graph';



@Component({
    templateUrl: "./aspect-hierarchy.component.html",
    styleUrls: ["./index.scss"]
})
export class AspectHierarchyComponent implements AfterViewInit {

    private _sub: Subscription;
    private _popupVisible = false;
    private _aspectID: string;

    constructor(private _aspectService: AspectService, private _route: ActivatedRoute) {

    }

    ngOnInit() {

    }

    private _refresh() {
        this._aspectID = this._route.parent.snapshot.params['id'];
        this._aspectService.getAspectPropertyGraph(this._aspectID).subscribe((graph: AspectPropertyGraph) => {
            this._drawGraph(graph.toVisualGraph());
        });
    }

    ngAfterViewInit() {
        this._sub = this._route.parent.params.subscribe(params => {
            this._refresh();
        });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }


    private _drawGraph(data: any) {
        cytoscape({
            container: document.getElementById('cy'),

            layout: {
                name: 'cose',
                padding: 10
            },

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'shape': 'data(faveShape)',
                    'width': 'mapData(weight, 40, 80, 20, 60)',
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': 'data(faveColor)',
                    'background-color': 'data(faveColor)',
                    'color': '#fff'
                })
                .selector(':selected')
                .css({
                    'border-width': 3,
                    'border-color': '#333'
                })
                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'opacity': 0.666,
                    'width': 'mapData(strength, 70, 100, 2, 6)',
                    'target-arrow-shape': 'triangle',
                    'source-arrow-shape': 'circle',
                    'line-color': 'data(faveColor)',
                    'source-arrow-color': 'data(faveColor)',
                    'target-arrow-color': 'data(faveColor)'
                })
                .selector('edge.questionable')
                .css({
                    'line-style': 'dotted',
                    'target-arrow-shape': 'diamond'
                })
                .selector('.faded')
                .css({
                    'opacity': 0.25,
                    'text-opacity': 0
                }),

            elements: data,

            ready: function() {
                window.cy = this;
            }
        });
    }






}