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
import { getEffectsFolder } from './module.helper';
import { getPluralPropertyName, getAPIUrl } from '../utility/utility';

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

  const content = tree.read(indexEffectPath) || null;
  tree.overwrite(
    indexEffectPath,
    formatTypeScriptFile(content && content.toString())
  );

  const effectTree = apply(effectFile, [
    move(effectPath),
    template({
      ...strings,
      ...options,
      getAPIUrl,
      getPluralPropertyName
    }),
    prettifyFiles()
  ]);

  return mergeWith(effectTree, MergeStrategy.Default);
}
