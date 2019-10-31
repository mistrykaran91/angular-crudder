import { Rule, SchematicContext, Tree, SchematicsException, apply, move, template, mergeWith, MergeStrategy, filter, url, chain } from '@angular-devkit/schematics';
import { normalize, strings, experimental } from '@angular-devkit/core';
import * as ts from 'typescript';

import * as helperFunctions from './export';
import { checkIfFileExists, getIDFieldName, prettifyFiles, formatTypeScriptFile } from '../utility';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function angularCrudder(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const workspace = getWorkspace(tree);
    const project = getProject(options, workspace);
    const appRoot = `${project.root}/` + `${project.sourceRoot}/` + `${project.prefix}/`;
    const folderPath = normalize(strings.dasherize(`${appRoot}${options.path}/${options.name}`));

    // source structure files.
    let files = url('./files');

    const fileContent = checkIfFileExists(options.schemaPath);

    if (!fileContent) {
      throw new SchematicsException('Schema file not found!');
    }

    let idFieldName = getIDFieldName(fileContent);
    const newTree = apply(files,
      [
        move(folderPath),
        template({
          ...strings,
          ...options,
          idFieldName,
          ...helperFunctions
        }),
        specFilter(options),
        prettifyFiles()
      ]);

    const templateRule = mergeWith(newTree, MergeStrategy.Default);
    const updateModuleRule = updateRootModule(options, workspace);
    const chainedRule = chain([templateRule, updateModuleRule]);
    return chainedRule(tree, _context);
  };
}

function specFilter(options: any): Rule {
  if (options.spec === "false") {
    return filter(path => {
      return !path.match(/\.spec\.ts$/) && !path.match(/test\.ts$/)
    })
  }
  return filter(path => !path.match(/test\.ts$/));
}

function getWorkspace(tree: Tree): experimental.workspace.WorkspaceSchema {

  const workspace = tree.read('/angular.json');

  if (!workspace) {
    throw new SchematicsException('angular.json file not found.');
  }

  return JSON.parse(workspace.toString());

}

function getProject(options: any, workspace: any) {
  options.project = (options.project === 'defaultProject')
    ? workspace.defaultProject : options.project;

  return workspace.projects[options.project];
}

function updateRootModule(options: any, workspace: any): Rule {

  return (tree: Tree, _context: SchematicContext): Tree => {
    const project = getProject(options, workspace);

    const rootModulePath = `${project.root}/` +
      `${project.sourceRoot}/` +
      `${project.prefix}/` +
      `${project.prefix}.module.ts`;

    const name = strings.dasherize(options.name);

    const listComponentName = `${strings.classify(options.name)}ListComponent`;
    const detailsComponentName = `${strings.classify(options.name)}DetailsComponent`;
    const editComponentName = `${strings.classify(options.name)}EditComponent`;

    const listImportContent = `import { ${listComponentName} } ` +
      `from './${name}/${name}-list/${name}-list.component';`

    const detailsImportContent = `\nimport { ${detailsComponentName} } ` +
      `from './${name}/${name}-details/${name}-details.component';`

    const editImportContent = `\nimport { ${editComponentName} } ` +
      `from './${name}/${name}-edit/${name}-edit.component';`

    const moduleFile = getAsSourceFile(tree, rootModulePath);
    const lastImportEndPos = findlastImportEndPos(moduleFile);
    const importArrayEndPos = findDeclarationsArray(moduleFile);

    const rec = tree.beginUpdate(rootModulePath);
    rec.insertLeft(lastImportEndPos + 1, listImportContent.concat(detailsImportContent).concat(editImportContent));
    rec.insertLeft(importArrayEndPos - 1, `,\n${listComponentName},\n${detailsComponentName},\n${editComponentName}`);
    tree.commitUpdate(rec);

    const _file = tree.read(rootModulePath);
    const formattedContent = formatTypeScriptFile(_file && _file.toString());
    tree.overwrite(rootModulePath, formattedContent);
    return tree;
  };
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

function findDeclarationsArray(file: ts.SourceFile): number {
  let pos: number = 0;

  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.kind === ts.SyntaxKind.Decorator) {
          classChild.forEachChild((moduleDeclaration: ts.Node) => {
            moduleDeclaration.forEachChild((objectLiteral: ts.Node) => {
              objectLiteral.forEachChild((property: ts.Node) => {
                if (property.getFullText().includes('declarations')) {
                  pos = property.end;
                }
              });
            });
          });
        }
      });
    }
  });

  return pos;
}