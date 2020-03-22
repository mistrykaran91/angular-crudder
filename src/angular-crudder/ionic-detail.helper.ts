import {
  checkIfFileExists,
  generateDiv,
  getEachPropertyWithPath,
  generateButton,
  generateTable,
  getListPropertyName,
  replaceSyntax
} from '../utility';
import { AngularAttribute } from '../maps';
import {
  generateIonList,
  generateIonItem,
  generateIonLabel
} from '../utility/html.helper';
import { strings } from '@angular-devkit/core';

export function generateDetailTemplate(
  schemaPath: string,
  name: string,
  idFieldName: string
) {
  const fileContent = checkIfFileExists(schemaPath);

  if (fileContent) {
    const ionList = generateIonList();

    const propertyWithPath = getEachPropertyWithPath(fileContent);

    propertyWithPath.forEach((element, index) => {
      if (element.key !== idFieldName) {
        const ionItem = generateIonItem('full');

        const ionLabelKey = generateIonLabel(
          `${element.label}`,
          'ion-margin-horizontal'
        );

        ionItem.appendChild(ionLabelKey);

        const ionLabelValue = generateIonLabel(
          `{{${strings.camelize(name)}.${element.key}}}`,
          'ion-text-wrap'
        );
        ionItem.appendChild(ionLabelValue);

        ionList.appendChild(ionItem);
      }
    });

    return ionList.innerHTML.toString();
  }
}
