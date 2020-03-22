import {
  SchematicContext,
  Rule,
  Tree,
  SchematicsException
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as ts from 'typescript';
const fs = require('fs');
const path = require('path');

import {
  getProject,
  isNullOrUndefined,
  formatTypeScriptFile,
  buildRelativePath
} from '../utility';
import { ComponentType } from '../enums';

export function updateModule(options: any, workspace: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const project = getProject(options, workspace);

    const filePath = getModuleFilePath(options, project);

    if (!isNullOrUndefined(filePath)) {
      const fileExists = tree.exists(filePath);
      if (fileExists) {
        updateModuleFile(options, tree, filePath, project);
      } else {
        throw new SchematicsException(
          `Module file does not exists. You can use --skipModuleImport flag to skip the import of module`
        );
      }
    } else {
      throw new SchematicsException(
        `Module file does not exists. You can use --skipModuleImport flag to skip the import of module`
      );
    }

    return tree;
  };
}

export function getModuleFilePath(options: any, project: any) {
  if (options.module !== 'root' && options.module !== 'app.module') {
    const path = `./${project.root}/${project.sourceRoot}/${project.prefix}/`;
    const srcFiles = getAllFiles(path);
    return srcFiles.find((r: string) =>
      r.match(new RegExp(options.module, 'g'))
    );
  } else {
    return (
      `${project.root}/` +
      `${project.sourceRoot}/` +
      `${project.prefix}/` +
      `${project.prefix}.module.ts`
    );
  }
}

export function getActionsFolder(options: any, project: any) {
  return (
    `${project.root}/` +
    `${project.sourceRoot}/` +
    `${project.prefix}/` +
    `actions`
  );
}

export function getInterfacesFolder(options: any, project: any) {
  return (
    `${project.root}/` +
    `${project.sourceRoot}/` +
    `${project.prefix}/` +
    `interfaces`
  );
}

export function getSelectorsFolder(options: any, project: any) {
  return (
    `${project.root}/` +
    `${project.sourceRoot}/` +
    `${project.prefix}/` +
    `selectors`
  );
}

export function getReducersFolder(options: any, project: any) {
  return (
    `${project.root}/` +
    `${project.sourceRoot}/` +
    `${project.prefix}/` +
    `reducers`
  );
}

export function getEffectsFolder(options: any, project: any) {
  return (
    `${project.root}/` +
    `${project.sourceRoot}/` +
    `${project.prefix}/` +
    `effects`
  );
}

export function updateorCreateActions(
  tree: any,
  options: any,
  workspace: any
): Tree {
  const project = getProject(options, workspace);

  const filePath = getActionsFolder(options, project);

  if (!isNullOrUndefined(filePath)) {
    tree.create(`${filePath}/${options.name}.actions.ts`, 'heellloo');
  } else {
    throw new SchematicsException(
      `Module file does not exists. You can use --skipModuleImport flag to skip the import of module`
    );
  }

  return tree;
}

function updateModuleFile(
  options: any,
  tree: any,
  modulePath: string,
  project: any
) {
  const listComponent = getFileDetails(
    options.name,
    ComponentType.LIST,
    project,
    modulePath
  );
  const detailsComponent = getFileDetails(
    options.name,
    ComponentType.DETAILS,
    project,
    modulePath
  );
  const editComponent = getFileDetails(
    options.name,
    ComponentType.EDIT,
    project,
    modulePath
  );

  const content = listComponent.componentImport
    .concat(detailsComponent.componentImport)
    .concat(editComponent.componentImport);

  const moduleFile = getAsSourceFile(tree, modulePath);
  const lastImportEndPos = findlastImportEndPos(moduleFile);
  const importArray = findDeclarationsArray(moduleFile);

  const componentName = (importArray.isEmptyArray ? '' : ',')
    .concat(`${listComponent.componentName}`)
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

function getFileDetails(
  name: string,
  type: ComponentType,
  project: any,
  modulePath: string
) {
  const componentName = `${strings.classify(name.concat(`-${type}`))}Component`;
  const path = `\\${project.sourceRoot}\\${project.prefix}\\${name}\\${name}-${type}\\${name}-${type}.component.ts`;
  let relativePath = buildRelativePath(`\\${modulePath}`, path);
  relativePath = relativePath.replace('.ts', '');
  const componentImport = `import { ${componentName} } from '${relativePath}';`;

  return {
    componentName,
    componentImport
  };
}

function getAllFiles(directory: string) {
  return fs.readdirSync(directory).reduce((files: any, file: any) => {
    const name = path.join(directory, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
}

export function getAsSourceFile(tree: Tree, path: string): ts.SourceFile {
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

export function getOrCreateSourceFile(tree: Tree, path: string) {
  const file = tree.read(path) || '';

  if (!file) {
    tree.create(path, 'HIIIIIIIIIIIII');
  }

  return ts.createSourceFile(
    path,
    file.toString(),
    ts.ScriptTarget.Latest,
    true
  );
}

export function findlastImportEndPos(file: ts.SourceFile): number {
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
                  let declarationArray = property
                    .getFullText()
                    .replace('declarations:', '');
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

export function findImportsArray(file: ts.SourceFile): any {
  // let pos: number = 0;

  const imports = {
    position: 0,
    isEmptyArray: true,
    text: '',
    importDeclarationText: ''
  };

  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ImportDeclaration) {
      //const text = node.getFullText();
      // if (routerInstance.some(e => text.includes(e))) {
      imports.importDeclarationText += node.getFullText();
      //}
    }
  });

  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.kind === ts.SyntaxKind.Decorator) {
          classChild.forEachChild((moduleDeclaration: ts.Node) => {
            moduleDeclaration.forEachChild((objectLiteral: ts.Node) => {
              objectLiteral.forEachChild((property: ts.Node) => {
                if (property.getFullText().includes('imports')) {
                  let importArray = property
                    .getFullText()
                    .replace('imports:', '');
                  importArray = importArray.replace(/\s/g, '');
                  imports.isEmptyArray = importArray === '[]';
                  imports.position = property.end;
                  imports.text = property.getFullText() || '';
                }
              });
            });
          });
        }
      });
    }
  });

  return imports;
}

export function findRouteConst(file: ts.SourceFile) {
  const route = {
    position: 0,
    isEmptyArray: true,
    text: ''
  };

  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.VariableStatement) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.getFullText().includes('routes')) {
          route.text = classChild.getFullText();
          let routeArray = classChild.getFullText().split('=');
          const cleanedRouteArray =
            routeArray && routeArray[1] && routeArray[1].replace(/\s/g, '');
          route.isEmptyArray = cleanedRouteArray === '[]';
          route.position = classChild.end;
        }
      });
      return route;
    }
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.kind === ts.SyntaxKind.Decorator) {
          classChild.forEachChild((moduleDeclaration: ts.Node) => {
            moduleDeclaration.forEachChild((objectLiteral: ts.Node) => {
              objectLiteral.forEachChild((property: ts.Node) => {
                if (property.getFullText().includes('imports')) {
                  let importArray = property
                    .getFullText()
                    .replace('imports:', '');
                  importArray = importArray.replace(/\s/g, '');
                  route.isEmptyArray = importArray === '[]';
                  route.position = property.end;
                  route.text = property.getFullText() || '';
                }
              });
            });
          });
        }
      });
      return route;
    }
  });

  return route;
}

export function findRouterImport(file: ts.SourceFile) {
  const route = {
    position: 0,
    isEmptyArray: true,
    text: ''
  };

  file.forEachChild((node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.ClassDeclaration) {
      node.forEachChild((classChild: ts.Node) => {
        if (classChild.kind === ts.SyntaxKind.Decorator) {
          classChild.forEachChild((moduleDeclaration: ts.Node) => {
            moduleDeclaration.forEachChild((objectLiteral: ts.Node) => {
              objectLiteral.forEachChild((property: ts.Node) => {
                if (property.getFullText().includes('imports')) {
                  let importArray = property
                    .getFullText()
                    .replace('imports:', '');
                  importArray = importArray.replace(/\s/g, '');
                  route.isEmptyArray = importArray === '[]';
                  route.position = property.end;
                  route.text = property.getFullText() || '';
                }
              });
            });
          });
        }
      });
      return route;
    }
  });

  return route;
}
