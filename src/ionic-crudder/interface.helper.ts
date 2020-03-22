import { prettifyFiles, formatTypeScriptFile } from '../utility/prettify/prettifier';
import { strings } from '@angular-devkit/core';
import {
  apply,
  move,
  Rule,
  url,
  template,
  Tree,
  mergeWith,
  MergeStrategy,
  SchematicsException
} from '@angular-devkit/schematics';
import { getInterfacesFolder } from './module.helper';
import { generateModel } from '../angular-crudder/export';

export function createOrUpdateInterface(
  project: any,
  options: any,
  tree: Tree
) {
  const interfacesPath = getInterfacesFolder(options, project);
  const interfaceFilePath = `${interfacesPath}/${strings.dasherize(options.name)}-interface.ts`;
  const file = tree.read(interfaceFilePath) || '';

  if (!file) {
    const interfaceDefinition = generateModel(options.schemaPath, options.name);
    tree.create(interfaceFilePath, formatTypeScriptFile( interfaceDefinition));

  } else {
    throw new SchematicsException(`${interfaceFilePath} file already exists`);
  }
}
