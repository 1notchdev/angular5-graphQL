import { AfterViewInit, Component, OnInit, ViewEncapsulation, ViewChild, ErrorHandler } from '@angular/core';
import { Subscription } from 'rxjs';
import { AspectService } from '../../../model/services/aspect-service.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../model/services/property-service.service';
import { DxTreeViewComponent } from 'devextreme-angular';
import { ElementService } from '../../../model/services/element-service.service';
import { ElementDataSource } from '../../../model/utils/element-data-source';
import { Aspect } from '../../../model/entities/aspect';
import 'rxjs/add/operator/toPromise';
import { Property } from '../../../model/entities/property';
import { RuleGroup } from '../../../model/entities/rule';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: "./element-properties.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementPropertiesComponent implements OnInit {

    private _sub: Subscription;
    private _popupVisible = false;
    private _elementID: string;
    private _properties: Property[] = [];
    private data: ElementDataSource;
    private promise: Promise<any>;
    private _uniqueID = 1000;
    private _excludedAspects: Aspect[] = [];
    private _extendPopupVisible = false;
    private _selectedAspectIds: Set<string> = new Set<string>();
    private _ruleGroups: RuleGroup[] = [];
    @ViewChild("aspectTree") aspectTree: DxTreeViewComponent;


    readonly createChildren = parent => {
        if (!this.data) return this.promise;
        if (!parent) {
            const a = this.data.getDirectAspects().map(asp => this._mapTreeCell(asp, ""));
            return a;
        } else {
            const a = this.data.getParentAspectForAspect(parent.itemData.value.id).map(asp => this._mapTreeCell(asp, parent.key));
            return a;
        }
    };

    private _mapTreeCell(asp: Aspect, parentId: string) {
        return {
            id: this._uniqueID++,
            parentId: parentId,
            value: asp,
            text: asp.name,
            expanded: true,
            hasItems: this.data.doesAspectHaveParents(asp)
        };
    }

    constructor(private _elementService: ElementService, private _route: ActivatedRoute, private _propertyService: PropertyService, private _errorHandler: ErrorHandler) {

    }

    ngOnInit() {
        this._sub = this._route.parent.params.subscribe(params => {
            this._refresh();
        });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    private _refresh() {
        this._elementID = this._route.parent.snapshot.params['id'];
        return (this.promise = new Promise<any>((resolve, reject) => {
            this._elementService.aspectsForElement(this._elementID).subscribe((data: ElementDataSource) => {
                this.data = data;
                const cells = this.data.getDirectAspects().map(asp => this._mapTreeCell(asp, ""))
                resolve(cells);
            }, err => reject(err));
        }));

    }

    private _isProcessing = false;
    private onSelectedAspectChange(e) {
        if (this._isProcessing) return;
        this._isProcessing = true;
        this._selectNode(e.node, e.node.selected);
        this._selectChildNodesRecursively(e.node, e.node.selected);
        this._updatePropertiesAndRulesList();
        this._isProcessing = false;
    }

    private _updateTreeViewWithNodes(nodes: any[]) {
        this._isProcessing = true;
        const treeInstance = this.aspectTree.instance;
        treeInstance.option("items", nodes);
        treeInstance.option("items").forEach(item => {
            if (this._selectedAspectIds.has(item.value.id)) {
                treeInstance.selectItem(item);
            }
        });
        this._isProcessing = false;
    }

    private _selectChildNodesRecursively(node: any, selected: boolean) {
        node.children.forEach(node => {
            this._selectNode(node, selected);
            this._selectChildNodesRecursively(node, selected);
        });
    }

    private _selectNode(node, selected: boolean) {
        if (selected) {
            this._selectedAspectIds.add(node.itemData.value.id);
            this.aspectTree.instance.selectItem(node.itemData);
        }
        else {
            this._selectedAspectIds.delete(node.itemData.value.id);
            this.aspectTree.instance.unselectItem(node.itemData);
        }
    }

    private _updatePropertiesAndRulesList() {
        var props, rules;
        [props, rules] = this.data.getDirectPropertiesAndRulesForAspects(this._selectedAspectIds);
        this._properties = props;
        this._ruleGroups = rules;
    }

    private onNewAspectAdded() {
        this._refresh().then(nodes => {
            this._updateTreeViewWithNodes(nodes);
            this._updatePropertiesAndRulesList();
        }).catch(err => {
            this._errorHandler.handleError(err)
        });
    }

    private currentView: string = "Properties";
    private switchView(viewName: string) {
        this.currentView = viewName;
    }

    private _isProcessingRequest = false;
    private processCommand(observable: Observable<any>) {
        if (this._isProcessingRequest) {
            this._errorHandler.handleError("Another request is being processed. Please wait!");
            return;
        }
        this._isProcessingRequest = false;
        return observable.finally(() => {
            this._isProcessing = false;
        });
    }

    private onDeleteAspect(aspectItem: any) {
        this.processCommand(this._elementService.removeAspectsForElement([aspectItem.value.id], this._elementID)).subscribe(() => {
            this._deleteAspectInDataSourceAndTreeView(aspectItem);
        });
    }

    private _deleteAspectInDataSourceAndTreeView(aspectItem: any) {
        this.aspectTree.instance.unselectItem(aspectItem);
        const treeItems = this.aspectTree.instance.option("items");
        this.aspectTree.instance.option("items", treeItems.filter(node => node !== aspectItem));
        this.data.deleteAspect(aspectItem.value.id);
    }



    private onShowAspectSelectorDialog() {
        this._excludedAspects = this.data.getDirectAspects();
        this._extendPopupVisible = true;
    }

}