import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';

@Directive({
    selector: '[confirmClick]'
})
export class ConfirmClickDirective {
    @Output() readonly onConfirm = new EventEmitter();

    @HostListener('click') onMouseClick() {
        var result = confirm("Are you sure you want to delete?", "Confirm delete");
        result.done(confirmed => {
            if (confirmed) {
                this.onConfirm.emit();
            }
        });
    }


}