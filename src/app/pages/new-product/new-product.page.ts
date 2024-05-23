import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SalesService } from 'src/app/services/sales.service';
import { ProductIdValidator } from './product-id.validator';

@Component({
    selector: 'eu-new-product',
    templateUrl: 'new-product.page.html',
    styleUrls: ['new-product.page.scss']
})

export class NewProductPage implements OnInit {
    addProductEnabled = false;

    productForm = new UntypedFormGroup({
        productName: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
        productID: new UntypedFormControl('', [Validators.required, ProductIdValidator.Code]),
        productManager: new UntypedFormControl('', [Validators.maxLength(30)]),
        salesStartDate: new UntypedFormControl('', [Validators.required]),
    });

    errors = {
        productName: { message: "Product name should be of maximum 50 characters size and is a required field", status: 'hidden' },
        productID: { message: "Product id should be sized 13 numerical characters and is a required field", status: 'hidden' },
        productManager: { message: "Product manager should have a maximum 30 characters", status: 'hidden' },
        salesStartDate: { message: "Sales start data is required", status: 'hidden' },
    }

    constructor(private salesService: SalesService, private messageService: MessageService) {

    }

    private getControlStatus(control: AbstractControl | null) {
        return control?.invalid && (control.dirty || control.touched) ? 'visible' : 'hidden';
    }

    ngOnInit() {
        this.productForm.statusChanges.subscribe(status => {
            // can be done in the template, but I think it is cleaner this way
            this.errors.productName.status = this.getControlStatus(this.productForm.get('productName'));
            this.errors.productID.status = this.getControlStatus(this.productForm.get('productID'));
            this.errors.productManager.status = this.getControlStatus(this.productForm.get('productManager'));
            this.errors.salesStartDate.status = this.getControlStatus(this.productForm.get('salesStartDate'));
            this.addProductEnabled = status === 'VALID';
        });
    }

    addProduct() {
        this.salesService.AddNewProduct(this.productForm.value);
        this.messageService.add({ severity: 'success', summary: "Product succesfully added" });
    }

    clear() {
        this.productForm.reset();
    }
}