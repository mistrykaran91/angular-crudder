import { strings } from '@angular-devkit/core';

import { PropertyType, NEW_LINE, checkIfFileExists } from '../utility';
import { TypeScriptMap } from '../enums';
import { formatTypeScriptFile } from '../utility/prettify/prettifier';

function intialiseModelData(properties: any, modelName: string) {
  let modelData = '';

  let test: any =
    Object.entries(properties)
      .map(props => {
        const key = props[0];
        const property: any = props[1];

        if (property.type === PropertyType.GROUP) {
          const capitalizedKey = strings.capitalize(key);

          const childProperty =
            properties && properties[key] && properties[key].property;

          if (childProperty) {
            modelData = modelData.concat(
              intialiseModelData(properties[key].property, capitalizedKey)
            );
          }
          return `${NEW_LINE} ${key}: ${capitalizedKey}`;
        } else if (property.type === PropertyType.ARRAY) {
          return `${NEW_LINE} ${key}: null,`;
        } else {
          const dataType =
            TypeScriptMap.get(property.type) || TypeScriptMap.get('text');

          if (property.isId) {
            return `${NEW_LINE} ${key}: 0,`;
          } else {
            return `${NEW_LINE} ${key}: null,`;
          }
        }
      })
      .reduce((a: any, b: any) => (a += b), '') || '';

  let interfaceContent = `${NEW_LINE} const initialize${modelName}: ${modelName} = { ${NEW_LINE}`;
  interfaceContent += test;
  interfaceContent += `${NEW_LINE} } ${NEW_LINE}`;

  return formatTypeScriptFile(modelData + interfaceContent);
}

export function intialiseModel(schemaPath: string, name: string): string {
  const schemaDefinition = checkIfFileExists(schemaPath);
  if (schemaDefinition) {
    const interfaceName = strings.classify(name);
    let value = '';
    value = value.concat(intialiseModelData(schemaDefinition, interfaceName));
    return formatTypeScriptFile(value);
  }

  return '';
}
