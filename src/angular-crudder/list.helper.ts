import { Theme } from "../models";
import { checkIfFileExists, generateDiv, getEachPropertyWithPath, generateButton, generateTable, getListPropertyName, replaceSyntax } from "../utility";
import { AngularAttribute } from "../maps";

export function generateListTemplate(schemaPath: string, name: string, theme = Theme.BOOTSTRAP, idFieldName: string) {

    const fileContent = checkIfFileExists(schemaPath);

    const defaultConfig = require('../default-config.json');
    let themeObject: any = {};

    if (theme === Theme.BOOTSTRAP) {
        themeObject = defaultConfig && defaultConfig.bootstrap;
    }

    if (fileContent) {

        const { list } = themeObject;

        const parentTemplate = generateDiv('');

        // main Container Div:-
        const containerDiv = generateDiv(list.mainDivClass);
        parentTemplate.appendChild(containerDiv);

        // header/ title Div:-
        const header = generateDiv(list.mainHeaderClass);
        header.innerHTML = "{{ pageTitle }}";
        containerDiv.appendChild(header);

        // body div:-
        const mainBody = generateDiv(list.mainBodyClass);

        // Add button div:-

        const { add } = list.actions;

        const addButtonDiv = generateDiv('');
        const button = generateButton(add.label, add.class, `${add.clickFunctionName}()`);
        addButtonDiv.appendChild(button);
        mainBody.appendChild(addButtonDiv);

        const propertyWithPath = getEachPropertyWithPath(fileContent);

        const pluralName = getListPropertyName(name);

        const tableDiv = generateDiv(list.tableDivClass);
        tableDiv.setAttribute(AngularAttribute.NG_IF, `${pluralName} & ${pluralName}.length`);
        let table = generateTable(list, name, propertyWithPath, idFieldName);

        tableDiv.appendChild(table);

        mainBody.appendChild(tableDiv);
        containerDiv.appendChild(mainBody);

        return replaceSyntax(parentTemplate.innerHTML.toString());
    }
}

