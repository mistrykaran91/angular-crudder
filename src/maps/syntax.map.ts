export enum AngularAttribute {
    NG_FORM_CONTROL_NAME = 'ng-form-control-name',
    NG_FOR_LOOP = 'ng-for-loop',
    NG_VALUE = 'ng-value',
    NG_CLICK = 'ng-click',
    NG_DISABLED = 'ng-disabled',
    NG_FORM_GROUP = 'ng-form-group',
    NG_ROUTER_LINK = 'ng-router-link',
    NG_IF = 'ng-if',
    NG_COLSPAN = 'ng-colspan',
    NG_GROUP_NAME = 'ng-group-name',
    NG_FORM_ARRAY = 'ng-form-array-name'
}

export const Syntax = new Map([
    [AngularAttribute.NG_IF, '*ngIf'],
    [AngularAttribute.NG_COLSPAN, '[attr.colspan]'],
    [AngularAttribute.NG_CLICK, '(click)'],
    [AngularAttribute.NG_DISABLED, '[disabled]'],
    [AngularAttribute.NG_FORM_GROUP, '[formGroup]'],
    [AngularAttribute.NG_GROUP_NAME, 'formGroupName'],
    [AngularAttribute.NG_FORM_CONTROL_NAME, 'formControlName'],
    [AngularAttribute.NG_FORM_ARRAY, 'formArrayName'],
    [AngularAttribute.NG_FOR_LOOP, '*ngFor'],
    [AngularAttribute.NG_VALUE, '[value]'],
    [AngularAttribute.NG_ROUTER_LINK, '[routerLink]'],
    ['amp;', '&'],
    ['&lt;', '<'],
    ['&gt;', '>']
]);

