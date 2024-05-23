import { AbstractControl } from "@angular/forms";

export class ProductIdValidator {
    static Code(control: AbstractControl) {
        let value = control.value;
        if (value === null || value === '') return null;
        if (!value.toString().match(/^[0-9]+(\.?[0-9]+)?$/) || value.toString().length !== 13) return { 'invalidProductId': true };
        return null;
    }
}