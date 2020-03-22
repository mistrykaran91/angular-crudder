import { generateForm } from './form-group.helper';
import { generateComponentTemplate } from './edit.helper';
import { generateListTemplate } from './list.helper';
import { generateDetailsTemplate } from './details.helper';
import { updateModule } from './module.helper';
import { generateModel } from './model.helper';
import { updateRouteFile } from './route.helper';

import {
  getApiPath,
  getBaseUrl,
  getCreateMethod,
  getDeleteMethod,
  getPluralMethod,
  getPluralProperty,
  getSingularMethod,
  getSingularProperty,
  getUpdateMethod
} from '../utility';
import { intialiseModel } from '../angular-crudder/export';
import { generateDetailTemplate } from '../angular-crudder/ionic-detail.helper';
import { generateIonicEditTemplate } from '../angular-crudder/ionic-edit.helper';
import { generateEditForm } from '../angular-crudder/edit-form-group.helper';

export {
  generateForm,
  generateComponentTemplate,
  generateListTemplate,
  generateDetailsTemplate,
  getApiPath,
  getBaseUrl,
  getCreateMethod,
  getDeleteMethod,
  getPluralMethod,
  getPluralProperty,
  getSingularMethod,
  generateModel,
  getSingularProperty,
  getUpdateMethod,
  updateModule,
  updateRouteFile,
  intialiseModel,
  generateDetailTemplate,
  generateIonicEditTemplate,
  generateEditForm
};
