import { strings } from '@angular-devkit/core';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

import { isNullOrUndefined, getListPropertyName } from '../utility';
import { AngularAttribute } from '../maps';
import { HTMLType } from '../enums';
import { PropertyWithPath } from '../models';

const doc = new JSDOM(`<p></p>`).window.document;

export function generateDiv(className: string | null = null) {
  const div = doc.createElement('div');

  if (!isNullOrUndefined(className)) {
    div.className = className;
  }
  return div;
}

export function generateIonList(): HTMLElement {
  return doc.createElement('ion-list');
}

export function generateIonGrid(): HTMLElement {
  return doc.createElement('ion-grid');
}

export function generateIonItem(
  lines: string,
  className: string | null = null
): HTMLElement {
  const ionItem = doc.createElement('ion-item');
  ionItem.setAttribute('lines', lines);
  if (!isNullOrUndefined(className)) {
    ionItem.setAttribute('class', className);
  }
  return ionItem;
}

export function generateIonEditRowColumn(
  colSmSize = '8',
  colSmOffset = '2',
  label: string,
  inputType: string,
  formControlName: string,
  maxlength: number
): HTMLElement {
  const ionRow = doc.createElement('ion-row');
  const ionCol = doc.createElement('ion-col');

  ionCol.setAttribute('size-sm', colSmSize);
  ionCol.setAttribute('offset-sm', colSmOffset);

  const ionItem = generateIonItem('full');

  // Create enum or types here:-
  const ionLabel = generateIonLabel(label, null, 'floating');
  const ionInput = generateIonInput(inputType, formControlName, maxlength);

  ionItem.appendChild(ionLabel);
  ionItem.appendChild(ionInput);

  ionCol.appendChild(ionItem);
  ionRow.appendChild(ionCol);

  return ionRow;
}

export function generateIonEditRowSelect(
  colSmSize = '8',
  colSmOffset = '2',
  label: string,
  formControlName: string
): HTMLElement {
  const ionRow = doc.createElement('ion-row');
  const ionCol = doc.createElement('ion-col');

  ionCol.setAttribute('size-sm', colSmSize);
  ionCol.setAttribute('offset-sm', colSmOffset);

  const ionItem = generateIonItem('full');

  // Create enum or types here:-
  const ionLabel = generateIonLabel(label, null, 'floating');
  const ionSelect = generateIonSelect(formControlName);

  ionItem.appendChild(ionLabel);
  ionItem.appendChild(ionSelect);

  ionCol.appendChild(ionItem);
  ionRow.appendChild(ionCol);

  return ionRow;
}

export function generateIonLabel(
  label: string,
  className: string | null = null,
  position: string | null = null
) {
  const ionLabel = doc.createElement('ion-label');
  if (!isNullOrUndefined(className)) {
    ionLabel.setAttribute('class', className);
  }

  if (!isNullOrUndefined(position)) {
    ionLabel.setAttribute('position', position);
  }

  ionLabel.innerText = strings.capitalize(label);
  ionLabel.innerHTML = strings.capitalize(label);
  return ionLabel;
}

export function generateIonInput(
  type: string,
  formControlName: string,
  maxlength: number
) {
  const ionInput = doc.createElement('ion-input');

  ionInput.setAttribute('type', type);

  ionInput.setAttribute(AngularAttribute.NG_FORM_CONTROL_NAME, formControlName);

  if (maxlength && type === HTMLType.TEXT) {
    ionInput.maxlength = maxlength;
  }
  return ionInput;
}

export function generateIonSelect(key: string) {
  const select = doc.createElement('ion-select');
  select.setAttribute(AngularAttribute.NG_FORM_CONTROL_NAME, key);

  const defaultOption = doc.createElement('ion-select-option');
  defaultOption.setAttribute('value', '');
  defaultOption.innerHTML = '{{ defaultOption }}';
  defaultOption.innerText = '{{ defaultOption }}';

  select.options.add(defaultOption);

  const option = doc.createElement('ion-select-option');
  option.setAttribute(AngularAttribute.NG_VALUE, 'item.id');
  option.innerHTML = '{{ item?.name }}';
  option.innerText = '{{ item?.name }}';

  option.setAttribute(AngularAttribute.NG_FOR_LOOP, '');
  select.options.add(option);

  return select;
}

export function generateLabel(key: string, emptyLabel = false) {
  const label = doc.createElement('label');
  if (!emptyLabel) {
    label.setAttribute('for', key);
    label.innerText = strings.capitalize(key);
    label.innerHTML = strings.capitalize(key);
  }
  return label;
}

export function generateInput(properties: any, key: string, className: string) {
  const input = doc.createElement('input');
  input.type = properties.type;
  input.id = key;
  input.name = key;
  input.placeholder = strings.capitalize(key);
  input.className = className;
  input.setAttribute(AngularAttribute.NG_FORM_CONTROL_NAME, key);

  if (properties.maxlength && properties.type === HTMLType.TEXT) {
    input.maxLength = properties.maxlength;
  }

  return input;
}

export function generateRadio(key: string, value: string) {
  const input = doc.createElement('input');
  input.type = HTMLType.RADIO;
  input.name = key;
  input.setAttribute(AngularAttribute.NG_FORM_CONTROL_NAME, key);
  input.value = value;
  return input;
}

export function generateSelect(key: string, className: string) {
  const select = doc.createElement('select');
  select.id = key;
  select.name = key;
  select.className = className;
  select.setAttribute(AngularAttribute.NG_FORM_CONTROL_NAME, key);

  const defaultOption = doc.createElement('option');
  defaultOption.setAttribute('value', '');
  defaultOption.innerHTML = '{{ defaultOption }}';
  defaultOption.innerText = '{{ defaultOption }}';

  select.options.add(defaultOption);

  const option = doc.createElement('option');
  option.setAttribute(AngularAttribute.NG_VALUE, 'item.id');
  option.innerHTML = '{{ item?.name }}';
  option.innerText = '{{ item?.name }}';

  option.setAttribute(AngularAttribute.NG_FOR_LOOP, '');
  select.options.add(option);

  return select;
}

export function generateButton(
  key: string,
  className: string,
  clickFunctionName: string,
  label?: string,
  setDisabledCondition = ''
) {
  const button = doc.createElement('button');
  button.id = 'btn' + key;
  button.name = 'btn' + key;

  button.type = 'button';

  if (className !== null && className !== undefined && className !== '') {
    button.className = className;
  }

  button.setAttribute(AngularAttribute.NG_CLICK, clickFunctionName);
  if (!isNullOrUndefined(setDisabledCondition)) {
    button.setAttribute(AngularAttribute.NG_DISABLED, setDisabledCondition);
  }

  const textNode = doc.createTextNode(label ? label : key);

  button.appendChild(textNode);

  return button;
}

export function generateAnchorTag(className: string | null) {
  const anchor = doc.createElement('a');

  if (!isNullOrUndefined(className)) {
    anchor.className = className;
  }
  return anchor;
}

export function generateBootstrapColumnDiv(properties: any, themeObject: any) {
  const div = generateDiv(themeObject.rowClass);

  if (properties.required) {
    div.classList.add(...[themeObject.requiredClass]);
  }
  return div;
}

export function generateFieldHTML(
  propertyWithPath: PropertyWithPath,
  themeObject: any,
  name: string
) {
  const { details } = themeObject;

  const div = generateDiv(null);
  div.classList.add(...details.fieldClass);

  const fieldLabel = generateLabel(propertyWithPath.key || '');

  const label = doc.createElement('label');
  label.setAttribute('class', details.labelClass);

  const textNode = doc.createTextNode(
    `{{ ${strings.camelize(name)}?.${propertyWithPath.htmlPath} }}`
  );
  label.appendChild(textNode);

  div.appendChild(fieldLabel);
  div.appendChild(label);

  return div;
}

export function generateNgContainer() {
  const ngContainer = doc.createElement('ng-container');
  return ngContainer;
}

export function generateForm(className: string) {
  const form = doc.createElement('form');

  form.setAttribute('autocomplete', 'off');

  if (!isNullOrUndefined(className)) {
    form.className = className;
  }

  form.setAttribute(AngularAttribute.NG_FORM_GROUP, 'mainForm');
  form.setAttribute('novalidate', '');
  return form;
}

export function generateLegend(key: string) {
  const legend = doc.createElement('legend');
  const text = doc.createTextNode(strings.classify(key));
  legend.appendChild(text);
  return legend;
}

export function createTextNode(text: string) {
  return doc.createTextNode(text);
}

// Table HTML :-

export function generateTable(
  themeObject: any,
  name: string,
  properties = new Array<PropertyWithPath>(),
  idFieldName = 'id'
) {
  let counter = 0;

  const table = doc.createElement('table');
  table.classList.add(...themeObject.tableClass);

  const tableHeader = doc.createElement('thead');
  const headerRow = doc.createElement('tr');

  properties.forEach((element, index) => {
    const isLast = index === properties.length - 1;
    const tableHeading = doc.createElement('th');
    tableHeading.innerHTML = !isLast
      ? element.label
      : themeObject.headerActions.label;
    headerRow.appendChild(tableHeading);
  });

  tableHeader.appendChild(headerRow);

  const tableBody = doc.createElement('tbody');
  const tableRow = doc.createElement('tr');

  const pluralName = getListPropertyName(name);
  const itemName = strings.camelize(name);

  tableRow.setAttribute(
    AngularAttribute.NG_FOR_LOOP,
    `let ${itemName} of ${pluralName}; let i = index;`
  );
  tableBody.appendChild(tableRow);

  properties.forEach((element, index) => {
    const tableData = doc.createElement('td');
    const isLast = index === properties.length - 1;
    const isFirst = index === 0;

    const { edit } = themeObject.headerActions;

    if (isFirst) {
      const comment = doc.createTextNode('<!-- Put your view route here  -->');
      const anchorText = doc.createTextNode(`{{${itemName}?.${idFieldName}}}`);
      const anchorTag = generateAnchorTag(null);
      anchorTag.setAttribute(
        AngularAttribute.NG_ROUTER_LINK,
        `['/${itemName}', ${itemName}?.${idFieldName}]`
      );
      anchorTag.appendChild(anchorText);
      tableData.appendChild(comment);
      tableData.appendChild(anchorTag);
    } else if (isLast) {
      const editLink = generateAnchorTag(edit.label);
      editLink.setAttribute(
        AngularAttribute.NG_ROUTER_LINK,
        `['/${itemName}/edit', ${itemName}?.${idFieldName}]`
      );
      const editText = doc.createTextNode(edit.label);
      editLink.appendChild(editText);
      tableData.appendChild(editLink);

      const deleteAction = themeObject.headerActions.delete;

      const deleteButton = generateButton(
        deleteAction.label,
        deleteAction.class,
        `${deleteAction.clickFunctionName}(${itemName})`
      );
      tableData.appendChild(deleteButton);
    } else {
      tableData.innerHTML = `{{${itemName}?.${element.htmlPath}}}`;
    }

    tableRow.appendChild(tableData);
  });

  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  // WIP need to check:-
  if (counter > 0) {
    createHeaderCell(headerRow, 'Actions');

    const editButton = generateButton(
      'Edit',
      themeObject.actionButtonClass,
      'onEditClick({item,rowIndex:i})'
    );
    const deleteButton = generateButton(
      'Delete',
      themeObject.actionButtonClass,
      'onDeleteClick(i)'
    );

    createCellWithTemplates(tableRow, [editButton, deleteButton]);
  }

  const noRow = doc.createElement('tr');
  noRow.setAttribute(
    AngularAttribute.NG_IF,
    `!(${pluralName} amp;amp; ${pluralName}?.length)`
  );

  const combineCell = doc.createElement('td');
  combineCell.setAttribute(
    AngularAttribute.NG_COLSPAN,
    properties.length.toString()
  );

  const cellText = doc.createTextNode(
    `{{ '${themeObject.emptyTableMessage}' }}`
  );
  combineCell.appendChild(cellText);
  noRow.appendChild(combineCell);

  tableBody.appendChild(noRow);

  return table;
}

export function createHeaderCell(headerRow: any, cellText: string) {
  const cell = doc.createElement('th');
  const headerText = doc.createTextNode(cellText);

  cell.appendChild(headerText);
  headerRow.appendChild(cell);
}

export function createCell(tableRow: any, cellText: string) {
  const rowCell = doc.createElement('td');
  const rowText = doc.createTextNode(cellText);
  rowCell.appendChild(rowText);
  tableRow.appendChild(rowCell);
}

export function createCellWithTemplates(tableRow: any, cellTemplates: any) {
  const rowCell = doc.createElement('td');

  cellTemplates.forEach((template: any) => {
    rowCell.appendChild(template);
  });

  tableRow.appendChild(rowCell);
}
