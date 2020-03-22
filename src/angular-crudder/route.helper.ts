import { ComponentType } from './../enums/component-type.enum';
import { SchematicContext, Tree, Rule } from "@angular-devkit/schematics";

import { getProject, formatTypeScriptFile } from "../utility";

import { getModuleFilePath, findImportsArray, getAsSourceFile, findlastImportEndPos, findRouteConst, findRouterImport } from './module.helper';
import { strings } from "@angular-devkit/core";

export function updateRouteFile(options: any, workspace: any): Rule {

    return (tree: Tree, _context: SchematicContext): Tree => {

        const project = getProject(options, workspace);
        const filePath = getModuleFilePath(options, project);
        const moduleFile = getAsSourceFile(tree, filePath);
        const importsObject = findImportsArray(moduleFile);
        const routerInstance = ['@angular/router', 'routing.module'];

        const text = importsObject.importDeclarationText &&
            importsObject.importDeclarationText.replace(/\s/g, '');

        if (routerInstance.some(e => text.includes(e))) {

            const routeObject = findRouterImport(moduleFile);
            const routerModuleIndex = text.indexOf('RouterModule');
            const routerModuleEndIndex = text.indexOf(')]',routerModuleIndex);
            const cleanedText = text.slice(routerModuleIndex,routerModuleEndIndex + 1).replace(/\s/g, '');
            cleanedText.endsWith("[])");

            // const routeObject = findRouteConst(moduleFile);
            
            const routeUpdate = ((routeObject.isEmptyArray) ? '' : ' , ').concat(`${getRoutes(options)}`);
            const rec = tree.beginUpdate(filePath);
            rec.insertLeft(routeObject.position - 1, routeUpdate);
            tree.commitUpdate(rec);

        } else {

            const importRouter = `import { Routes, RouterModule } from '@angular/router';`
            const routeDefinition = `const routes: Routes = [${getRoutes(options)}]`;
            const importUpdate = ((importsObject.isEmptyArray) ? '' : ' , ').concat(`RouterModule.forRoot(routes)`);

            const lastImportEndPos = findlastImportEndPos(moduleFile);

            const rec = tree.beginUpdate(filePath);
            rec.insertLeft(lastImportEndPos + 1, `${importRouter}\n\n${routeDefinition}`);
            rec.insertLeft(importsObject.position - 1, importUpdate);
            tree.commitUpdate(rec);
        }

        // const _file = tree.read(filePath);
        // const formattedContent = formatTypeScriptFile(_file && _file.toString());
        // tree.overwrite(filePath, formattedContent);

        return tree;
    }
}

const getRoutes = (options: any) => {
    return `
    {
        path : '${ strings.dasherize(options.name)}', component : ${strings.classify(options.name + '-' + ComponentType.LIST)}Component
    },
    {
        path : '${ strings.dasherize(options.name)}/create', component : ${strings.classify(options.name + '-' + ComponentType.EDIT)}Component, pathMatch:'full'
    },
    {
        path : '${ strings.dasherize(options.name)}/:id', component : ${strings.classify(options.name + '-' + ComponentType.DETAILS)}Component
    },
    {
        path : '${ strings.dasherize(options.name)}/edit/:id', component : ${strings.classify(options.name + '-' + ComponentType.EDIT)}Component
    }`;
}