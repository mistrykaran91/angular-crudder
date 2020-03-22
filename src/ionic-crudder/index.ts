import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  apply,
  move,
  template,
  mergeWith,
  MergeStrategy,
  filter,
  url,
  chain
} from '@angular-devkit/schematics';
import { normalize, strings, experimental } from '@angular-devkit/core';

import * as helperFunctions from './export';
import { checkIfFileExists, getIDFieldName, prettifyFiles } from '../utility';
import { getProject } from '../utility/utility';
import { createOrUpdateReducer } from './reducer.helper';
import { createOrUpdateActions } from './actions.helper';
import { createOrUpdateSelectors } from './selectors.helper';
import { createOrUpdateEffects } from './effects.helper';
import { createOrUpdateInterface } from './interface.helper';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ionicCrudder(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = getProject(options, workspace);
    const appRoot =
      `${project.root}/` + `${project.sourceRoot}/` + `${project.prefix}/`;
    const folderPath = normalize(
      strings.dasherize(`${appRoot}${options.path}/${options.name}`)
    );

    // source structure files.
    let files = url('./files');
    const fileContent = checkIfFileExists(options.schemaPath);

    if (!fileContent) {
      throw new SchematicsException('Schema file not found!');
    }

    let idFieldName = getIDFieldName(fileContent);
    const newTree = apply(files, [
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
    // const updateModuleRule = (options.skipModuleImport !== "true") ? helperFunctions.updateModule(options, workspace) : () => { };
    const updateRouteRule = helperFunctions.updateRouteFile(options, workspace);
    // createOrUpdateInterface(project, options, tree);
    // const chainedRule = chain([templateRule, updateModuleRule, updateRouteRule]);
    const chainedRule = chain([
      // templateRule,
      // updateRouteRule,
      // createOrUpdateActions(project, options, tree),
      createOrUpdateReducer(project, options, tree),
      // createOrUpdateSelectors(project, options, tree),
      // createOrUpdateEffects(project, options, tree)
    ]);
    return chainedRule(tree, _context);
  };
}

export function specFilter(options: any): Rule {
  if (options.spec === 'false') {
    return filter(path => {
      return !path.match(/\.spec\.ts$/) && !path.match(/test\.ts$/);
    });
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
