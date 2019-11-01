import { SchematicContext, Rule, Tree, SchematicsException } from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";
import * as ts from 'typescript';
const fs = require('fs');
const path = require('path');

import { getProject, isNullOrUndefined, formatTypeScriptFile, buildRelativePath } from "../utility";
import { ComponentType } from "../enums";

export function updateModule(options: any, workspace: any): Rule {

    return (tree: Tree, _context: SchematicContext): Tree => {

        const project = getProject(options, workspace);
        //const listPath = `\\${project.sourceRoot}\\${project.prefix}\\${options.name}\\${options.name}-list\\${options.name}-list.component.ts`;        

        if (options.module !== 'root' && options.module !== 'app.module') {

            const path = `./${project.root}/${project.sourceRoot}/${project.prefix}/`;
            const srcFiles = getAllFiles(path);
            const filePath = srcFiles.find((r: string) => r.match(new RegExp(options.module, 'g')));

            if (!isNullOrUndefined(filePath)) {
                const fileExists = tree.exists(filePath);
                if (fileExists) {
                    // console.log(buildRelativePath(``, listPath));
                    updateModuleFile(options, tree, filePath, project)
                }
            }
        } else {

            const rootModulePath = `${project.root}/` +
                `${project.sourceRoot}/` +
                `${project.prefix}/` +
                `${project.prefix}.module.ts`;

            updateModuleFile(options, tree, rootModulePath, project)
        }
        return tree;
    }
}

function updateModuleFile(options: any, tree: any, modulePath: string, project: any) {

    const listComponent = getFileDetails(options.name, ComponentType.LIST, project, modulePath);
    const detailsComponent = getFileDetails(options.name, ComponentType.DETAILS, project, modulePath);
    const editComponent = getFileDetails(options.name, ComponentType.EDIT, project, modulePath);

    const content = listComponent.componentImport
        .concat(detailsComponent.componentImport)
        .concat(editComponent.componentImport);

    const moduleFile = getAsSourceFile(tree, modulePath);
    const lastImportEndPos = findlastImportEndPos(moduleFile);
    const importArray = findDeclarationsArray(moduleFile);

    const componentName = (importArray.isEmptyArray ? '' : ',').concat(`${listComponent.componentName}`)
        .concat(`,${detailsComponent.componentName}`)
        .concat(`,${editComponent.componentName}`);

    const rec = tree.beginUpdate(modulePath);
    rec.insertLeft(lastImportEndPos + 1, content);
    rec.insertLeft(importArray.position - 1, componentName);
    tree.commitUpdate(rec);

    const _file = tree.read(modulePath);

    const formattedContent = formatTypeScriptFile(_file && _file.toString());
    tree.overwrite(modulePath, formattedContent);
}

function getFileDetails(name: string, type: ComponentType, project: any, modulePath: string) {

    const componentName = `${strings.classify(name.concat(`-${type}`))}Component`;
    const path = `\\${project.sourceRoot}\\${project.prefix}\\${name}\\${name}-${type}\\${name}-${type}.component.ts`;
    let relativePath = buildRelativePath(`\\${modulePath}`, path);
    relativePath = relativePath.replace('.ts', '');
    const componentImport = `import { ${componentName} } from '${relativePath}';`;

    return {
        componentName,
        componentImport
    }
}

function getAllFiles(directory: string) {

    return fs.readdirSync(directory).reduce((files: any, file: any) => {
        const name = path.join(directory, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, [])
}

function getAsSourceFile(tree: Tree, path: string): ts.SourceFile {
    const file = tree.read(path);
    if (!file) {
        throw new SchematicsException(`${path} not found`);
    }

    return ts.createSourceFile(
        path,
        file.toString(),
        ts.ScriptTarget.Latest,
        true
    );
}

function findlastImportEndPos(file: ts.SourceFile): number {
    let pos: number = 0;
    file.forEachChild((child: ts.Node) => {
        if (child.kind === ts.SyntaxKind.ImportDeclaration) {
            pos = child.end;
        }
    });
    return pos;
}

function findDeclarationsArray(file: ts.SourceFile): any {
    // let pos: number = 0;

    const declarations = {
        position: 0,
        isEmptyArray: true
    };

    file.forEachChild((node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            node.forEachChild((classChild: ts.Node) => {
                if (classChild.kind === ts.SyntaxKind.Decorator) {
                    classChild.forEachChild((moduleDeclaration: ts.Node) => {
                        moduleDeclaration.forEachChild((objectLiteral: ts.Node) => {
                            objectLiteral.forEachChild((property: ts.Node) => {
                                if (property.getFullText().includes('declarations')) {

                                    let declarationArray = property.getFullText().replace('declarations:', '');
                                    declarationArray = declarationArray.replace(/\s/g, '');
                                    declarations.isEmptyArray = declarationArray === '[]';
                                    declarations.position = property.end;
                                }
                            });
                        });
                    });
                }
            });
        }
    });

    return declarations;
}