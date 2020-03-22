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
import { getSelectorsFolder } from './module.helper';

export function createOrUpdateSelectors(
  project: any,
  options: any,
  tree: Tree
): Rule {
  const selectorsPath = getSelectorsFolder(options, project);
  const indexSelectorsPath = `${selectorsPath}/index.ts`;
  const selectorsFile = url('./ngrx/selectors/');

  const file = tree.read(indexSelectorsPath) || '';

  if (!file) {
    tree.create(
      indexSelectorsPath,
      `export * from './${strings.dasherize(options.name)}.selectors';`
    );
  } else {
    const rec = tree.beginUpdate(indexSelectorsPath);
    rec.insertLeft(
      file.length,
      `export * from './${strings.dasherize(options.name)}.selectors';`
    );
    tree.commitUpdate(rec);
  }

  const selectorsTree = apply(selectorsFile, [
    move(selectorsPath),
    template({
      ...strings,
      ...options
    }),
    prettifyFiles()
  ]);

  return mergeWith(selectorsTree, MergeStrategy.Default);
}
