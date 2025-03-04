import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributeRule, FilterStep } from 'src/app/model/filter';

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

    cloneStep(index: number): void {
        const stepItemData = this.steps.at(index).getRawValue();
        const clonedStep = this.createStepWithData(stepItemData);
        this.steps.push(clonedStep);
    }

    // Function to create a new form group (useful for cloning)
    createStepWithData(data: FilterStep): FormGroup {

        const rulesGroups: FormGroup[] = (data.attributeRules || ['']).map((rule: AttributeRule) => {
            return new FormGroup({
                attribute: new FormControl(rule.attribute, Validators.required),
                operator: new FormControl(rule.operator, Validators.required),
                value1: new FormControl(rule.value1, Validators.required),
                value2: new FormControl(rule.value2, Validators.required),
            });
        });

        return new FormGroup({
            eventName: new FormControl(data.eventName || '', Validators.required),
            attributeRules: new FormArray(rulesGroups),
        });
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
