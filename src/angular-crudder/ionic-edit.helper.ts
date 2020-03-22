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
  generateIonLabel,
  generateIonEditRowColumn
} from '../utility/html.helper';
import { strings } from '@angular-devkit/core';
import {
  generateIonGrid,
  generateNgContainer,
  generateIonEditRowSelect
} from '../utility/html.helper';

export function generateIonicEditTemplate(
  schemaPath: string,
  name: string,
  idFieldName: string
) {
  const fileContent = checkIfFileExists(schemaPath);

  if (fileContent) {
    const ionGrid = generateIonGrid();
    generateIonicEditHTML(fileContent, ionGrid, name);
    return replaceSyntax(ionGrid.innerHTML.toString());
  }
}

function generateIonicEditHTML(properties: any, parent: any, name: string) {
  Object.entries(properties).map(props => {
    const key = props[0];
    const property: any = props[1];

    if (!property.isId) {
      if (property.type === 'group') {
        const ngContainer = generateNgContainer();
        ngContainer.setAttribute(AngularAttribute.NG_GROUP_NAME, key);
        generateIonicEditTemplate(properties[key].property, parent, name);
      } else if (property.type === 'array') {
        const ngContainer = generateNgContainer();
        ngContainer.setAttribute(AngularAttribute.NG_FORM_ARRAY, key);
        generateIonicEditHTML(properties[key].property, ngContainer, name);
        parent.appendChild(ngContainer);
      } else if (property.type === 'select') {
        const ionEditRow = generateIonEditRowSelect(
          '6',
          '3',
          strings.capitalize(key),
          key
        );
        parent.appendChild(ionEditRow);
      } else if (property.type === 'radio') {
      } else {
        const ionEditRow = generateIonEditRowColumn(
          '6',
          '3',
          strings.capitalize(key),
          'text',
          key,
          property.maxlength
        );
        parent.appendChild(ionEditRow);
      }
    }
  });
}
