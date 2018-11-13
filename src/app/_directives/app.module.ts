
import { NgModule } from '@angular/core';
import { ConfirmClickDirective } from './click-confirm.directive';


@NgModule({
    declarations: [
        ConfirmClickDirective
    ],
    exports: [
        ConfirmClickDirective
    ],
})
export class CoreDirectiveModule { }