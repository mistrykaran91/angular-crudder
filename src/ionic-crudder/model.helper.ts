import { strings } from "@angular-devkit/core";

import { PropertyType, NEW_LINE, checkIfFileExists } from "../utility";
import { TypeScriptMap } from "../enums";

function generateModelData(properties: any, modelName: string) {

    let modelData = '';


    let test: any = Object.entries(properties)
        .map((props) => {
            const key = props[0];
            const property: any = props[1];

            if (property.type === PropertyType.GROUP) {

                const capitalizedKey = strings.capitalize(key);

                const childProperty = properties && properties[key] && properties[key].property;

                if (childProperty) {
                    modelData = modelData.concat(generateModelData(properties[key].property, capitalizedKey));
                }
                return `${NEW_LINE} ${key}: ${capitalizedKey}`;

            } else if (property.type === PropertyType.ARRAY) {
                return `${NEW_LINE} ${key}: Array<any>;`;

            } else {
                const dataType = TypeScriptMap.get(property.type) || TypeScriptMap.get('text');
                return `${NEW_LINE} ${key}: ${dataType};`
            }

        }).reduce((a: any, b: any) => a += b, '') || '';

    let interfaceContent = `${NEW_LINE} export interface ${modelName} { ${NEW_LINE}`;
    interfaceContent += test
    interfaceContent += `${NEW_LINE} } ${NEW_LINE}`;

    return modelData + interfaceContent;
}

export function generateModel(schemaPath: string, name: string) {
    const schemaDefinition = checkIfFileExists(schemaPath);
    if (schemaDefinition) {
        const interfaceName = strings.classify(name);
        let value = '';
        value = value.concat(generateModelData(schemaDefinition, interfaceName));
        return value;
    }
}
