import { strings, relative, normalize } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';

import { PropertyWithPath } from '../models';
import { Syntax } from '../maps';

export function replaceLast(string: string, find: string, replace: string) {
  var index = string.lastIndexOf(find);

  if (index >= 0) {
    return (
      string.substring(0, index) +
      replace +
      string.substring(index + find.length)
    );
  }

  return string.toString();
}

export function checkIfFileExists(schemaPath: string) {
  if (!schemaPath) {
    throw new SchematicsException(`should have required property 'schemaPath'`);
  }

  if (!schemaPath.endsWith('.json')) {
    throw new SchematicsException(` schemaPath should be proper JSON file`);
  }
  let schemaDefinition = '';
  try {
    const content = require(schemaPath);
    schemaDefinition = JSON.parse(JSON.stringify(content));
  } catch (e) {
    throw new SchematicsException(`JSON file is not parseable`);
  }

  return schemaDefinition;
}

export function isNullOrUndefined(value: string | null) {
  return value === '' || value === undefined || value === null;
}

export function getEachPropertyWithPath(
  schemaDefinition: any,
  keyValuePair = new Array<any>(),
  previousPath = '',
  previousHTMLPath = ''
) {
  Object.entries(schemaDefinition).map(props => {
    const key = props[0];
    const property: any = props[1];

    if (property.type === 'group') {
      const _key = !isNullOrUndefined(previousPath)
        ? `${previousPath}.${key}`
        : key;
      const htmlPath = !isNullOrUndefined(previousPath)
        ? `${previousPath}?.${key}`
        : key;
      getEachPropertyWithPath(property.property, keyValuePair, _key, htmlPath);
    } else if (property.type === 'array') {
    } else {
      keyValuePair.push(
        new PropertyWithPath(
          key,
          strings.capitalize(key),
          !isNullOrUndefined(previousPath) ? `${previousPath}.${key}` : key,
          !isNullOrUndefined(previousHTMLPath)
            ? `${previousHTMLPath}?.${key}`
            : key
        )
      );
    }
  });
  return keyValuePair;
}

export function getListPropertyName(value: string) {
  const lastCharacter = value[value.length - 1];

  if (lastCharacter !== 's') {
    return strings.camelize(`${value}s`);
  }
  return strings.camelize(value);
}

export function replaceSyntax(content: string) {
  Syntax.forEach((value: string, key: string) => {
    content = content.replace(RegExp(key, 'g'), value);
  });
  return content;
}

export function getIDFieldName(schema: any) {
  let idFieldName = 'id';

  Object.entries(schema).map(props => {
    const key = props[0];
    const property: any = props[1];

    if (property && property.isId === true) {
      idFieldName = key;
      return idFieldName;
    }
  });

  return idFieldName;
}

export function getProject(options: any, workspace: any) {
  options.project =
    options.project === 'defaultProject'
      ? workspace.defaultProject
      : options.project;

  return workspace.projects[options.project];
}

/**
 * Copied from angular CLI github:-
 * Build a relative path from one file path to another file path.
 */
export function buildRelativePath(from: string, to: string): string {
  from = normalize(from);
  to = normalize(to);

  // Convert to arrays.
  const fromParts = from.split('/');
  const toParts = to.split('/');

  // Remove file names (preserving destination)
  fromParts.pop();
  const toFileName = toParts.pop();

  const relativePath = relative(
    normalize(fromParts.join('/') || '/'),
    normalize(toParts.join('/') || '/')
  );
  let pathPrefix = '';

  // Set the path prefix for same dir or child dir, parent dir starts with `..`
  if (!relativePath) {
    pathPrefix = '.';
  } else if (!relativePath.startsWith('.')) {
    pathPrefix = `./`;
  }
  if (pathPrefix && !pathPrefix.endsWith('/')) {
    pathPrefix += '/';
  }

  return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}

// API Schematics Helper Methods.
export function getBaseUrl(name: string) {
  const url = strings.camelize(name);
  return `${url}Url`;
}

export function getApiPath(name: string) {
  const path = strings.dasherize(name);
  return `api/${path}s`;
}

export function getSingularMethod(name: string, parameter: string) {
  const method = strings.classify(name);
  return parameter ? `get${method}(${parameter})` : `get${method}()`;
}

export function getSingularProperty(name: string) {
  const property = strings.camelize(name);
  return property;
}

export function getPluralProperty(name: string) {
  const property = strings.camelize(name);
  return `${property}s`;
}

export function getPluralMethod(name: string) {
  const method = strings.classify(name);
  return `get${method}s()`;
}

export function getPluralPropertyName(
  name: string,
  pluralName: string,
  capitalize: string
) {
  if (pluralName) {
    return capitalize ? strings.capitalize(pluralName) : pluralName;
  } else {
    `${strings.camelize(name)}s`;
  }
}

export function getAPIUrl(name: string, api: string) {
  return api ? api : `api/${strings.camelize(name)}`;
}

export function getCreateMethod(name: string) {
  const method = strings.classify(name);
  const parameter = strings.camelize(name);
  return `create${method}(${parameter}:${method})`;
}

export function getUpdateMethod(name: string) {
  const method = strings.classify(name);
  const parameter = strings.camelize(name);
  return `update${method}(${parameter}:${method})`;
}

export function getDeleteMethod(name: string, parameter: string) {
  const method = strings.classify(name);
  return `delete${method}(${parameter})`;
}
