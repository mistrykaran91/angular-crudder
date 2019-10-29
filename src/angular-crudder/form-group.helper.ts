import { strings } from "@angular-devkit/core";

import { replaceLast, checkIfFileExists } from '../utility';
import {
    MAIN_FORM_NAME,
    FORM_GROUP_TEMPLATE,
    FORM_ARRAY_TEMPLATE,
    NEW_LINE,
    PropertyType
} from '../utility/const';

function generateFormServiceData(properties: any, formName: string | null) {

    if (!formName) {
        formName = MAIN_FORM_NAME
    }

    const formGroupString = FORM_GROUP_TEMPLATE;
    const formArrayString = FORM_ARRAY_TEMPLATE;

    let formData = "";

    let stringTypeMap = Object.entries(properties)
        .map((prop) => {

            const key: string = prop[0];
            const property: any = prop[1];

            if (property.type === PropertyType.ARRAY) {
                return `${NEW_LINE} '${key}': ${formArrayString},`;

            } else if (property.type === PropertyType.GROUP) {

                const capitalizedKey = strings.capitalize(key);
                const formName = `${capitalizedKey}Form`;
                formData = formData.concat(generateFormServiceData(properties[key].property, formName));
                return `${NEW_LINE} '${key}': this.create${formName}(),`;
            }
            else {

                if (property.required) {
                    return `${NEW_LINE} '${key}': ['', [Validators.required]],`
                } else {
                    return `${NEW_LINE} '${key}': [''],`
                }


            }
        }).reduce((a, b) => a += b, '');

    stringTypeMap = formGroupString + replaceLast(stringTypeMap, ",", "") + NEW_LINE + '});';
    let formTemplate = `${NEW_LINE}create${formName}():FormGroup {${NEW_LINE}`
    formTemplate += stringTypeMap
    formTemplate += `${NEW_LINE} } ${NEW_LINE}`

    return formTemplate + formData;
}

export function generateForm(schemaPath: string) {

    const schemaDefinition = checkIfFileExists(schemaPath);

    if (schemaDefinition) {
        let value = "";
        value = value.concat(generateFormServiceData(schemaDefinition, null));
        return value;
    }
}

