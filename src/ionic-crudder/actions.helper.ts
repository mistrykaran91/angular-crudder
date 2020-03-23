import {
  prettifyFiles,
  formatTypeScriptFile
} from '../utility/prettify/prettifier';
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
import { getPluralPropertyName, splittedCapitalize } from '../utility/utility';

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

  const content = tree.read(indexActionPath) || null;
  tree.overwrite(
    indexActionPath,
    formatTypeScriptFile(content && content.toString())
  );

  const actionsTree = apply(actionsFile, [
    move(actionsPath),
    template({
      ...strings,
      ...options,
      getPluralPropertyName,
      splittedCapitalize
    }),
    prettifyFiles()
  ]);

  return mergeWith(actionsTree, MergeStrategy.Default);
}
