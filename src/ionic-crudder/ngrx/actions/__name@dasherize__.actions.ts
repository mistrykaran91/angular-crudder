import { createAction, props } from '@ngrx/store';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

export const load<%= classify(name) %> = createAction('[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %>');

export const load<%= classify(name) %>Success = createAction(
  '[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %> Success',
  props<{ <%= getPluralPropertyName(name,pluralName) %>: Array<<%= classify(name) %>> }>()
);

export const load<%= classify(name) %>Failure = createAction(
  '[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %> Failure',
  props<{ error: any }>()
);

export const load<%= classify(name) %>ById = createAction(
  '[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %> By Id',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const load<%= classify(name) %>ByIdSuccess = createAction(
  '[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %> Success By Id',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const load<%= classify(name) %>ByIdFailure = createAction(
  '[<%= splittedCapitalize(name) %>] Load <%= splittedCapitalize(name) %> Failure By Id',
  props<{ error: any }>()
);

export const setCurrent<%= classify(name) %> = createAction(
  '[<%= splittedCapitalize(name) %>] Set Current <%= splittedCapitalize(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %> = createAction(
  '[<%= splittedCapitalize(name) %>] Create <%= splittedCapitalize(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %>Success = createAction(
  '[<%= splittedCapitalize(name) %>] Create <%= splittedCapitalize(name) %> Success',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %>Failure = createAction(
  '[<%= splittedCapitalize(name) %>] Create <%= splittedCapitalize(name) %> Failure',
  props<{ error: any }>()
);

export const update<%= classify(name) %> = createAction(
  '[<%= splittedCapitalize(name) %>] Update <%= splittedCapitalize(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const update<%= classify(name) %>Success = createAction(
  '[<%= splittedCapitalize(name) %>] Update <%= splittedCapitalize(name) %> Success',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const update<%= classify(name) %>Failure = createAction(
  '[<%= splittedCapitalize(name) %>] Update <%= splittedCapitalize(name) %> Failure',
  props<{ error: any }>()
);

export const show<%= classify(name) %>DeleteConfirmation = createAction(
  '[<%= splittedCapitalize(name) %>] Show <%= splittedCapitalize(name) %> Delete Confirmation',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const delete<%= classify(name) %> = createAction(
  '[<%= splittedCapitalize(name) %>] Delete <%= splittedCapitalize(name) %>',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const delete<%= classify(name) %>Revert = createAction(
  '[<%= splittedCapitalize(name) %>] Delete <%= splittedCapitalize(name) %> Revert'
);

export const delete<%= classify(name) %>Success = createAction(
  '[<%= splittedCapitalize(name) %>] Delete <%= splittedCapitalize(name) %> Success',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const delete<%= classify(name) %>Failure = createAction(
  '[<%= splittedCapitalize(name) %>] Delete <%= splittedCapitalize(name) %> Failure',
  props<{ error: any }>()
);
