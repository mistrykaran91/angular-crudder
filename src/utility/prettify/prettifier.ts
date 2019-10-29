import { Rule, Tree } from '@angular-devkit/schematics';
const prettier = require("prettier");

import { PRETTIER_CONFIG } from './prettify.config';

export function prettifyFiles(): Rule {
  return (tree: Tree): Tree => {

    tree.actions.map((data: any) => {

      if (data.path.indexOf('__name@dasherize__') === -1) {
        const simpleFileEntry: any = tree.get(data.path);
        const content = simpleFileEntry && simpleFileEntry.content && simpleFileEntry.content.toString();

        if (content) {
          if (data.path.endsWith('.html')) {

            const formattedContent = prettier.format(content, PRETTIER_CONFIG.html);
            tree.overwrite(data.path, formattedContent);
          }

          if (data.path.endsWith('.ts')) {
            const formattedContent = prettier.format(content, PRETTIER_CONFIG.typescript);
            tree.overwrite(data.path, formattedContent);
          }
        }
      }
    });
    return tree;
  }
}