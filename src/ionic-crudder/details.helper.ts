import {
    generateDiv,
    generateButton,
    generateNgContainer,
    generateLegend, generateFieldHTML,
    checkIfFileExists,
    getEachPropertyWithPath,
    replaceSyntax
} from '../utility';

import { Theme ,PropertyWithPath } from '../models';

export function generateDetailsTemplate(schemaPath: string, name: string, theme = Theme.BOOTSTRAP) {

    const fileContent = checkIfFileExists(schemaPath);

    const defaultConfig = require('../default-config.json');
    let themeObject: any = {};

    if (theme === Theme.BOOTSTRAP) {
        themeObject = defaultConfig && defaultConfig.bootstrap;
    }

    if (fileContent) {

        const { details } = themeObject;

        const parentTemplate = generateDiv('');

        // main Container Div:-
        const containerDiv = generateDiv(details.mainDivClass);
        parentTemplate.appendChild(containerDiv);

        // header/ title Div:-
        const header = generateDiv(details.mainHeaderClass);
        header.innerHTML = "{{ pageTitle }}";
        containerDiv.appendChild(header);

        // body div:-
        const mainBody = generateDiv(details.mainBodyClass);

        const rowDiv = generateDiv(details.rowDiv);
        mainBody.appendChild(rowDiv);

        const propertyWithPath = getEachPropertyWithPath(fileContent);
        generateDetailsHTML(fileContent, themeObject, propertyWithPath, rowDiv, name);

        //footerDiv
        const footerDiv = generateDiv(details.footerClass);

        const { edit, cancel } = details.footer;
        const deleteAction = details.footer.delete;

        const editButton = generateButton(edit.label, edit.class, `${edit.clickFunctionName}()`);
        const deleteButton = generateButton(deleteAction.label, deleteAction.class, `${deleteAction.clickFunctionName}()`);
        const cancelButton = generateButton(cancel.label, cancel.class, `${cancel.clickFunctionName}()`);

        footerDiv.appendChild(editButton);
        footerDiv.appendChild(deleteButton);
        footerDiv.appendChild(cancelButton);

        mainBody.appendChild(footerDiv);

        containerDiv.appendChild(mainBody);
        return replaceSyntax(parentTemplate.innerHTML.toString());
    }
}

function generateDetailsHTML(properties: any, themeObject: any, propertyWithPath: PropertyWithPath[], rowDiv: any, name: string) {

    Object.entries(properties)
        .map((props) => {
            const key = props[0];
            const property: any = props[1];

            if (property.type === "group") {

                const ngContainer = generateNgContainer();

                const legend = generateLegend(key);
                rowDiv.appendChild(legend);

                generateDetailsHTML(properties[key].property, themeObject, propertyWithPath, ngContainer, name);
                rowDiv.appendChild(ngContainer);

            } else if (property.type === "array") {

                if (properties[key] && properties[key].property) {
                    const ngContainer = generateNgContainer();
                    generateDetailsHTML(properties[key].property, themeObject, propertyWithPath, ngContainer, name);
                    rowDiv.appendChild(ngContainer);
                }

            } else {

                const _propertyWithPath: any = propertyWithPath && propertyWithPath.find(r => r && r.key === key);
                if (_propertyWithPath) {
                    const div = generateFieldHTML(_propertyWithPath, themeObject, name);
                    rowDiv.appendChild(div);
                }

            }
        })
}

