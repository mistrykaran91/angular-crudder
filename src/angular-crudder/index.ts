import { Rule, SchematicContext, Tree, SchematicsException, apply, move, template, mergeWith, MergeStrategy, filter, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import * as helperFunctions from './export';
import { checkIfFileExists, getIDFieldName, prettifyFiles } from '../utility';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function angularCrudder(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const folderPath = normalize(strings.dasherize(`${options.path}/${options.name}`));

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
    return templateRule(tree, _context);
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