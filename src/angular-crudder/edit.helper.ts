import { strings } from '@angular-devkit/core';

import {
    checkIfFileExists,
    generateDiv,
    generateForm,
    generateButton,
    generateNgContainer,
    generateLegend,
    generateBootstrapColumnDiv,
    generateLabel,
    generateSelect,
    generateRadio,
    createTextNode,
    generateInput,
    replaceSyntax
} from '../utility';

import { Theme } from '../models';
import { AngularAttribute } from '../maps';

export function generateComponentTemplate(schemaPath: string, name: string, theme = Theme.BOOTSTRAP) {

    const fileContent = checkIfFileExists(schemaPath);

    const defaultConfig = require('../default-config.json');
    let themeObject: any = {};

    if (theme === Theme.BOOTSTRAP) {
        themeObject = defaultConfig && defaultConfig.bootstrap;
    }

    if (fileContent) {

        const { edit } = themeObject;

        const parentTemplate = generateDiv('');

        // main Container Div:-
        const containerDiv = generateDiv(edit.mainDivClass);
        parentTemplate.appendChild(containerDiv);

        // header/ title Div:-
        const header = generateDiv(edit.mainHeaderClass);
        header.innerHTML = "{{ pageTitle }}";
        containerDiv.appendChild(header);

        // body div:-
        const formBody = generateForm(edit.mainBodyClass);
        containerDiv.appendChild(formBody);

        const rowDiv = generateDiv(edit.rowDiv);
        formBody.appendChild(rowDiv);

        generateHTML(fileContent, rowDiv, edit, name, themeObject);

        const { save, cancel } = edit.actions;

        const div = generateDiv(edit.actions.rowClass);

        const saveButton = generateButton(save.label, save.class, `${save.clickFunctionName}()`, save.label, `mainForm?.invalid`);
        div.appendChild(saveButton);

        const cancelButton = generateButton(cancel.label, cancel.class, `${cancel.clickFunctionName}()`, cancel.label);
        div.appendChild(cancelButton);

        rowDiv.appendChild(div);

        return replaceSyntax(parentTemplate.innerHTML.toString());
    }
}

function generateHTML(properties: any, parent: any, edit: any, name: string, themeObject: any) {

    Object.entries(properties)
        .map((props) => {
            const key = props[0];
            const property: any = props[1];

            if (!property.isId) {

                if (property.type === "group") {

                    const div = generateNgContainer();

                    const legend = generateLegend(key);
                    parent.appendChild(legend);

                    div.setAttribute(AngularAttribute.NG_GROUP_NAME, key);
                    generateHTML(properties[key].property, div, edit, name, themeObject);
                    parent.appendChild(div);

                } else if (property.type === "array") {

                    const div = generateDiv(null);
                    div.setAttribute(AngularAttribute.NG_FORM_ARRAY, key);
                    generateHTML(properties[key].property, div, edit, name, themeObject);
                    parent.appendChild(div);

                } else if (property.type === 'select') {
                    const div = generateBootstrapColumnDiv(property, edit);

                    generateLabel(key);
                    const sel = generateSelect(key, edit.controlClass);
                    div.appendChild(sel);
                    parent.appendChild(div);
                }
                else if (property.type === 'radio') {

                    const div = generateBootstrapColumnDiv(property, edit);
                    const radioLabel = generateLabel(key);
                    div.appendChild(radioLabel);

                    const newLineDiv = generateDiv(themeObject.newLineClass);
                    div.appendChild(newLineDiv);

                    if (property.enum && property.enum.length !== 0) {

                        property.enum.forEach((element: string) => {

                            const enumLabel = generateLabel(key, true);
                            enumLabel.setAttribute('class', edit.radioClass);

                            const radio = generateRadio(key, element);

                            const textNode = createTextNode(strings.classify(element));

                            enumLabel.appendChild(radio);
                            enumLabel.appendChild(textNode);
                            div.appendChild(enumLabel);
                        });

                    } else {

                        const enumLabel = generateLabel(key, true);
                        enumLabel.setAttribute('class', edit.radioClass);

                        const radio = generateRadio(key, "element");

                        const textNode = createTextNode(key);

                        enumLabel.appendChild(radio);
                        enumLabel.appendChild(textNode);
                        div.appendChild(enumLabel);
                    }
                    parent.appendChild(div);
                }

                // else if (property.type === 'checkbox') {
                //     //return ` ${key}:  ${this.getType(property.type)};\n`
                // }
                // else if (property.type === 'textarea') {
                //     //return ` ${key}:  ${this.getType(property.type)};\n`
                // }
                // else if (property.type === 'email') {
                //     //return ` ${key}:  ${this.getType(property.type)};\n`
                // }
                else {
                    const div = generateBootstrapColumnDiv(property, edit);
                    const label = generateLabel(key);
                    const input = generateInput(property, key, edit.controlClass);
                    div.appendChild(label);
                    div.appendChild(input);
                    parent.appendChild(div);
                }
            }
        })
}
