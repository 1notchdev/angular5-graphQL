import { Component, ContentChild, AfterContentInit, OnDestroy, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { DxPivotGridComponent } from "devextreme-angular";
import { Subscription } from 'rxjs';
import 'devextreme/integration/jquery';
import * as $ from 'jquery';
import { find } from 'rxjs/operator/find';
import { PropertyService } from '../../model/services/property-service.service';
import { confirm } from 'devextreme/ui/dialog';


const
    LEFT_KEY = 37,
    UP_KEY = 38,
    RIGHT_KEY = 39,
    DOWN_KEY = 40;

@Component({
    selector: "editable-pivot-grid",
    templateUrl: "./editable-pivot-grid.component.html",
    styleUrls: ['./editable-pivot-grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EditablePivotGridComponent implements AfterContentInit, OnDestroy, AfterViewInit {
    private _subscriptions: Subscription[] = [];
    @ContentChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;

    @Input()
    public readonly propertyID: string;

    @Input()
    public readonly valueField: string;

    @Output()
    public readonly onDataChanged = new EventEmitter<any[]>();

    constructor(private _propertyService: PropertyService) { }

    ngAfterContentInit() {
        this._subscriptions.push(this.pivotGrid.onCellClick.subscribe(e => this._handleCellClick(e)));
        this._subscriptions.push(this.pivotGrid.onCellPrepared.subscribe(e => this._handleAfterCellRendered(e)));
    }

    ngAfterViewInit() {
        $(".editable-pivot-grid .indigo-header-cell").on('click', e => {
            console.log(e);
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        });
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }


    private textbox: any;
    private numberbox: any;
    private datebox: any;
    private drillDownDataSource;
    private salesPopupTitle;
    private salesPopupVisible;
    private _handleCellClick(e: any) {
        if (!e.cellElement.is(this._focusedCell) && e.area === 'data') {
            this._setFocusedCell(e.cellElement);
            return;
        }
        this._setFocusedCell(null);
        var cell = e.cellElement;
        if (e.area == 'data') {
            cell.children().hide();
            var oldPadding = cell.css('padding');
            cell.css('padding', 0);
            cell.addClass("indigo-edit-cell")
            if (e.cell.dataType === "number") {
                this._createNumberBox(e, cell, oldPadding);
            }
            else if (e.cell.dataType === "text") {
                this._createTextBox(e, cell, oldPadding);
            }
        }
    }

    private _createNumberBox(e: any, cell: any, oldPadding: any) {
        this.numberbox = $("<div class='edit-cell'>").appendTo(cell)
            .on('click', function(ev) {
                ev.stopPropagation();
            })
            .dxNumberBox({
                value: cell.find('div.indigo-new-value').last().text() || e.cell.value,
                height: cell.height(),
                step: 0,
                onKeyUp: arg => this._handleKeyUp(arg, e, oldPadding, "number"),
                onFocusOut: arg => this._handleCellUpdateEvent(arg, e, oldPadding, true, "number")
            })
            .dxNumberBox('instance');
        this.numberbox.focus();
    }

    private _createTextBox(e: any, cell: any, oldPadding: any) {
        this.textbox = $("<div class='edit-cell'>").appendTo(cell)
            .on('click', function(ev) {
                ev.stopPropagation();
            })
            .dxTextBox({
                value: cell.find('div.indigo-new-value').last().text() || e.cell.value,
                height: cell.height(),
                onKeyUp: arg => this._handleKeyUp(arg, e, oldPadding, "text"),
                onFocusOut: arg => this._handleCellUpdateEvent(arg, e, oldPadding, true, "text")
            })
            .dxTextBox('instance');
        this.textbox.focus();
    }

    private _leftEnd = false;
    private _rightEnd = false;
    private _handleKeyUp(arg: any, e: any, oldPadding: any, inputType: "text" | "number" | "date") {
        const keyCode = arg.jQueryEvent.keyCode;
        if (keyCode === 13) {
            this._handleCellUpdateEvent(arg, e, oldPadding, false, inputType);
        }
        else if (keyCode === LEFT_KEY || keyCode === RIGHT_KEY) {
            const valueLength = (arg.event.currentTarget.value + "").length;
            const caretPosition = arg.event.currentTarget.selectionStart;
            if (caretPosition === valueLength) {
                this._handleCellUpdateEvent(arg, e, oldPadding, false, inputType);
                this._handleKeyNavigation(arg.jQueryEvent);
            }
            else if (caretPosition === 0) {
                this._handleCellUpdateEvent(arg, e, oldPadding, false, inputType);
                this._handleKeyNavigation(arg.jQueryEvent);
            }
        }
        else if (keyCode === UP_KEY || keyCode === DOWN_KEY) {
            this._handleCellUpdateEvent(arg, e, oldPadding, false, inputType);
            this._handleKeyNavigation(arg.jQueryEvent);
        }
    }

    private _handleCellUpdateEvent(arg: any, e: any, oldPadding: any, removeFocusCell: boolean, type: string) {
        arg.event.stopPropagation();
        this._handleCellValueChanged(e, arg);
        this._removeEditor(e.cellElement, oldPadding, type);
        this._setFocusedCell(removeFocusCell ? null : e.cellElement);
    }

    private _removeEditor(cell: any, oldPadding: any, type: string) {
        if (type === "text") {
            this.textbox.element().remove();
            this.textbox = null;
        } else if (type === "number") {
            this.numberbox.element().remove();
            this.numberbox = null;
        }
        cell.css('padding', oldPadding);
        cell.children().last().show();

    }

    private _exist(selector: any) {
        return !!selector.length;
    }

    private readonly CELL_MODIFIED_CLASS = "indigo-modified-cell";
    private _handleCellValueChanged(e: any, arg: any) {
        const newValue = arg.event.currentTarget.value;
        const cell = e.cellElement;
        const isModified = (newValue + "" !== e.cell.value + "");
        this._storeChangedCell(e, newValue, isModified);
        this._updateUICell(cell, newValue, isModified);
    }

    private _updateUICell(cell: any, newValue: any, isModified: boolean) {
        if (isModified) {
            const modifiedCell = cell.find('div.indigo-new-value');
            if (this._exist(modifiedCell)) {
                modifiedCell.text(newValue);
            }
            else {
                cell.children().hide();
                cell.append($(`<div class='indigo-new-value'>${newValue}</div>`));
            }
            cell.addClass(this.CELL_MODIFIED_CLASS);
        } else {
            cell.find('.indigo-new-value').remove();
            cell.children().show();
            cell.removeClass(this.CELL_MODIFIED_CLASS);
        }
    }

    private _rowPath(paths: string[]) {
        return paths.join('!r!');
    }

    private _columnPath(paths: string[]) {
        return paths.join('!c!');
    }
    private _getFullPath(e: any) {
        return [this._rowPath(e.cell.rowPath), this._columnPath(e.cell.columnPath)].join('--');
    }

    private _changedCellsMap: Map<string, any> = new Map();
    private _storeChangedCell(e: any, newValue, isModified: boolean) {
        const fullPath = this._getFullPath(e);
        if (!isModified) {
            this._changedCellsMap.delete(fullPath);
            return;
        }
        const existCell = this._changedCellsMap.get(this._getFullPath(e));
        if (existCell) {
            existCell.__data_value = newValue;
        }
        else {
            const cellData = {};
            cellData[this.valueField] = parseInt(newValue)
            e.cell.rowPath.forEach((value, index) => {
                cellData[e.rowFields[index]['dataField']] = value;
            });
            cellData['facts'] = this._getAssociatedFacts(e);
            this._changedCellsMap.set(fullPath, cellData);
        }

    }

    private _getAssociatedFacts(e) {
        var pivotGridDataSource = e.component.getDataSource();
        const facts = pivotGridDataSource.createDrillDownDataSource(e.cell);
        facts.load();
        return facts.items();
    }

    private _focusedCell: any;
    private _setFocusedCell(cellElement: any) {
        this._removePreviousFocusedCell();
        this._focusedCell = cellElement;
        if (this._focusedCell) {
            this._focusedCell.focusout(() => this._setFocusedCell(null));
            this._focusedCell.keyup(arg => this._handleKeyNavigation(arg));
            this._focusedCell.addClass("indigo-focused-cell");
            this._focusedCell.attr("tabIndex", 0);
            this._focusedCell.focus();
        }
    }

    private _removePreviousFocusedCell() {
        if (this._focusedCell) {
            this._focusedCell.removeClass("indigo-focused-cell");
            this._focusedCell.off("focusout");
            this._focusedCell.off("keyup");
            this._focusedCell.removeAttr("tabIndex");
            this._focusedCell = null;
        }
    }

    private _prevCell(cell: any) {
        const prevCell = cell.prev();
        if (!this._exist(prevCell)) {
            return cell.closest("tr").prev().find("td:last-child");
        }
        return prevCell;
    }

    private _nextCell(cell: any) {
        const nextCell = cell.next();
        if (!this._exist(nextCell)) {
            return cell.closest("tr").next().find("td:first-child");
        }
        return nextCell;
    }

    private _upCell(cell: any) {
        const index = cell.index() + 1;
        return cell.closest("tr").prev().find(`td:nth-child(${index})`);
    }

    private _downCell(cell: any) {
        const index = cell.index() + 1;
        return cell.closest("tr").next().find(`td:nth-child(${index})`);
    }

    private _handleKeyNavigation(arg) {
        arg.stopPropagation();
        if (!this._focusedCell) return;
        const keyCode = arg.keyCode;
        if (keyCode === 13) {
            $('.indigo-focused-cell')[0].click();
            return;
        }
        var newFocusedCell = this._focusedCell;
        //left
        if (keyCode === LEFT_KEY) {
            newFocusedCell = this._prevCell(this._focusedCell);
        }
        //up
        else if (keyCode === UP_KEY) {
            newFocusedCell = this._upCell(this._focusedCell);
        }
        //right
        else if (keyCode === RIGHT_KEY) {
            newFocusedCell = this._nextCell(this._focusedCell);
        }
        //down
        else if (keyCode === DOWN_KEY) {
            newFocusedCell = this._downCell(this._focusedCell);
        }
        if (this._exist(newFocusedCell) && newFocusedCell !== this._focusedCell) {
            this._setFocusedCell(newFocusedCell);
        }

    }

    private _handleAfterCellRendered(e: any) {
        if (e.area !== 'data') {
            e.cellElement.addClass("indigo-header-cell");
            $('<div>').addClass('header-overlay').appendTo(e.cellElement).click(arg => this._handleHeaderCellClick(arg, e));
        }
        else {
            const modifiedCell = this._changedCellsMap.get(this._getFullPath(e));
            if (modifiedCell) {
                this._updateUICell(e.cellElement, modifiedCell[this.valueField], true);
            }
        }
    }

    private _handleHeaderCellClick(arg: any, e: any) {
        if (e.cell.type === 'T') return;
        if (this._changedCellsMap.size === 0) return;
        const changedPaths = Array.from(this._changedCellsMap.keys());
        var path = '';
        if (e.area === 'row') {
            path = this._rowPath(e.cell.path);
        }
        else if (e.area === 'column') {
            path = this._columnPath(e.cell.path);
        }
        const affectedModifiedPaths = this._getModifiedCellsInPath(path, changedPaths);
        if (affectedModifiedPaths.length > 0) {
            this._showConfirmPopup(e, affectedModifiedPaths);
            return false;
        }
    }

    private _showConfirmPopup(e: any, affectedModifiedPaths: string[]) {
        confirm("Unsaved Changes will be discarded when you change the aggregation level. Do you want to proceed?", "Confirm delete")
            .done(confirmed => {
                if (confirmed) {
                    this._removeModifiedCells(affectedModifiedPaths);
                    e.cellElement.click();
                }
            });

    }

    private _removeModifiedCells(affectedModifiedPaths: string[]) {
        affectedModifiedPaths.forEach(path => this._changedCellsMap.delete(path));
    }

    private _getModifiedCellsInPath(path: string, changedPaths: any[]) {
        return changedPaths.filter(p => p.includes(path));

    }

    private onReload() {
        this._discardChanges();
        this.pivotGrid.instance.repaint();
    }

    private _discardChanges() {
        this._changedCellsMap.clear();
    }

    private _getChangedCells(): any[] {
        return Array.from(this._changedCellsMap.values());
    }

    private onSaveChanges() {
        this._propertyService.updateValueChangesForProperty(this._getChangedCells(), this.propertyID).subscribe((data: any[]) => {
            this.onDataChanged.emit(data);
            this.pivotGrid.instance.getDataSource().reload();
            this._discardChanges();
        });
    }

    private onViewDetails() {

    }

}