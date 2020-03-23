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
import { getActionsFolder } from './module.helper';
import { getPluralPropertyName } from '../utility/utility';

export function createOrUpdateActions(
  project: any,
  options: any,
  tree: Tree
): Rule {
  const actionsPath = getActionsFolder(options, project);
  const indexActionPath = `${actionsPath}/index.ts`;
  const actionsFile = url('./ngrx/actions/');

  const file = tree.read(indexActionPath) || '';

  if (!file) {
    tree.create(
      indexActionPath,
      `export * from './${strings.dasherize(options.name)}.actions';`
    );
  } else {
    const rec = tree.beginUpdate(indexActionPath);
    rec.insertLeft(
      file.length,
      `export * from './${strings.dasherize(options.name)}.actions';`
    );
    tree.commitUpdate(rec);
  }

  const actionsTree = apply(actionsFile, [
    move(actionsPath),
    template({
      ...strings,
      ...options,
      getPluralPropertyName,
    }),
    prettifyFiles()
  ]);

  return mergeWith(actionsTree, MergeStrategy.Default);
}
