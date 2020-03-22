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
import { getEffectsFolder } from './module.helper';

export function createOrUpdateEffects(
  project: any,
  options: any,
  tree: Tree
): Rule {

  const effectPath = getEffectsFolder(options, project);
  const indexEffectPath = `${effectPath}/index.ts`;
  const effectFile = url('./ngrx/effects/');

  const file = tree.read(indexEffectPath) || '';

  if (!file) {
    tree.create(
      indexEffectPath,
      `export * from './${strings.dasherize(options.name)}.effects';`
    );
  } else {
    const rec = tree.beginUpdate(indexEffectPath);
    rec.insertLeft(
      file.length,
      `export * from './${strings.dasherize(options.name)}.effects';`
    );
    tree.commitUpdate(rec);
  }

  const effectTree = apply(effectFile, [
    move(effectPath),
    template({
      ...strings,
      ...options
    }),
    prettifyFiles()
  ]);

  return mergeWith(effectTree, MergeStrategy.Default);
}
