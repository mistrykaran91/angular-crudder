import { prettifyFiles } from '../utility/prettify/prettifier';
import { strings } from '@angular-devkit/core';
import {
  apply,
  move,
  Rule,
  url,
  template,
  Tree,
  mergeWith,
  MergeStrategy
} from '@angular-devkit/schematics';
import { getReducersFolder } from './module.helper';
import { intialiseModel } from '../angular-crudder/intialise-model.helper';

export function createOrUpdateReducer(
  project: any,
  options: any,
  tree: Tree
): Rule {
  const reducerPath = getReducersFolder(options, project);
  const reducerFile = url('./ngrx/reducers/');
  const indexReducerPath = `${reducerPath}/index.ts`;

  const file = tree.read(indexReducerPath) || '';

  if (!file) {
    tree.create(
      indexReducerPath,
      `export * from './${strings.dasherize(options.name)}.reducer';`
    );
  } else {
    const rec = tree.beginUpdate(indexReducerPath);
    rec.insertLeft(
      file.length,
      `export * from './${strings.dasherize(options.name)}.reducer';`
    );
    tree.commitUpdate(rec);
  }

  const reducerTree = apply(reducerFile, [
    move(reducerPath),
    template({
      ...strings,
      ...options,
      intialiseModel
    }),
    prettifyFiles()
  ]);

  return mergeWith(reducerTree, MergeStrategy.Default);
}
