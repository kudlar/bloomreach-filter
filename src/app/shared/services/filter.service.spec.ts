import { TestBed } from '@angular/core/testing';
import { FormArray, FormGroup } from '@angular/forms';
import { FilterStep } from 'src/app/model/filter';
import { StringOperator } from 'src/app/model/string-operator.enum';
import { FilterService } from './filter.service';

describe('FilterService', () => {
    let service: FilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FilterService],
        });
        service = TestBed.inject(FilterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('addStep', () => {
        it('should add a new step to the form array', () => {
            expect(service.steps.length).toBe(0);
            service.addStep();
            expect(service.steps.length).toBe(1);
            expect(service.steps.at(0) instanceof FormGroup).toBe(true);
            expect(service.steps.at(0).get('eventName')).toBeTruthy();
            expect(service.steps.at(0).get('attributeRules')).toBeTruthy();
        });
    });

    describe('removeStep', () => {
        it('should remove a step from the form array', () => {
            service.addStep();
            expect(service.steps.length).toBe(1);
            service.removeStep(0);
            expect(service.steps.length).toBe(0);
        });
    });

    describe('cloneStep', () => {
        it('should clone a step and add it to the form array', () => {
            service.addStep();
            const stepData: FilterStep = {
                eventName: 'event1',
                attributeRules: [
                    {
                        attribute: {
                            property: 'prop1',
                            type: 'string',
                        },
                        operator: StringOperator.DoesNotContain,
                        value1: 'val1',
                        value2: 'val2',
                    },
                ],
            };

            const formGroup = service.createStepWithData(stepData);
            service.steps.push(formGroup);

            expect(service.steps.length).toBe(2);
            service.cloneStep(1);
            expect(service.steps.length).toBe(3);
            expect(service.steps.at(2).get('eventName')?.value).toBe('event1');
            expect((service.steps.at(2).get('attributeRules') as FormArray)?.length).toBe(1);
        });
    });

    describe('addAttributeRule', () => {
        it('should add a new attribute rule to a step', () => {
            service.addStep();
            service.addAttributeRule(0);
            const attributeRules = service.getAttributeRules(0);
            expect(attributeRules.length).toBe(1);
            expect(attributeRules.at(0) instanceof FormGroup).toBe(true);
            expect(attributeRules.at(0).get('attribute')).toBeTruthy();
        });
    });

    describe('removeAttributeRule', () => {
        it('should remove an attribute rule from a step', () => {
            service.addStep();
            service.addAttributeRule(0);
            expect(service.getAttributeRules(0).length).toBe(1);
            service.removeAttributeRule(0, 0);
            expect(service.getAttributeRules(0).length).toBe(0);
        });
    });

    describe('createStepWithData', () => {
        it('should create a FormGroup from the provided step data', () => {
            const stepData: FilterStep = {
                eventName: 'event2',
                attributeRules: [
                    {
                        attribute: {
                            property: 'prop1',
                            type: 'string',
                        },
                        operator: StringOperator.DoesNotContain,
                        value1: 'val1',
                        value2: 'val2',
                    },
                ],
            };

            const formGroup = service.createStepWithData(stepData);

            expect(formGroup instanceof FormGroup).toBe(true);
            expect(formGroup.get('eventName')?.value).toBe('event2');
            expect((formGroup.get('attributeRules') as FormArray)?.length).toBe(1);
            expect((formGroup.get('attributeRules') as FormArray)?.at(0).get('attribute')?.value.property).toBe('prop1');
        });
    });
});
