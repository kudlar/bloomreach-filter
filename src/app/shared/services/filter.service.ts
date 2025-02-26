import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FilterService {

    private _form: FormGroup = new FormGroup({
        steps: new FormArray([]),
    });

    // steps

    addStep(): void {
        this.steps.push(new FormGroup({
            eventName: new FormControl(null, Validators.required),
            attributeRules: new FormArray([]),
        }));
    }

    removeStep(index: number): void {
        this.steps.removeAt(index);
    }

    get steps(): FormArray {
        return this._form.get('steps') as FormArray;
    }

    // rules

    addAttributeRule(stepIndex: number): void {
        const rules = this.getAttributeRules(stepIndex);
        rules.push(new FormGroup({
            attribute: new FormControl(null, Validators.required),
            operator: new FormControl(null, Validators.required),
            value1: new FormControl(null, Validators.required),
            value2: new FormControl(null, Validators.required),
        }));
    }

    removeAttributeRule(stepIndex: number, ruleIndex: number): void {
        this.getAttributeRules(stepIndex).removeAt(ruleIndex);
    }

    getAttributeRules(stepIndex: number): FormArray {
        return this.steps.at(stepIndex).get('attributeRules') as FormArray;
    }

    ///

    get form(): FormGroup {
        return this._form;
    }
}
