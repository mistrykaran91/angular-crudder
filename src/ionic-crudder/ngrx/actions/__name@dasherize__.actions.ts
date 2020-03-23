import { createAction, props } from '@ngrx/store';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

export const load<%= classify(name) %> = createAction('[<%= classify(name) %>] Load <%= classify(name) %>');

export const load<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Success',
  props<{ <%= getPluralPropertyName(name,pluralName) %>: Array<<%= classify(name) %>> }>()
);

export const load<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Failure',
  props<{ error: any }>()
);

export const load<%= classify(name) %>ById = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> By Id',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const load<%= classify(name) %>ByIdSuccess = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Success By Id',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const load<%= classify(name) %>ByIdFailure = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Failure By Id',
  props<{ error: any }>()
);

export const setCurrent<%= classify(name) %> = createAction(
  '[<%= classify(name) %>] Set Current <%= classify(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %> = createAction(
  '[<%= classify(name) %>] Create <%= classify(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %>] Create <%= classify(name) %> Success',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const create<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %>] Create <%= classify(name) %> Failure',
  props<{ error: any }>()
);

export const update<%= classify(name) %> = createAction(
  '[<%= classify(name) %>] Update <%= classify(name) %>',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const update<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %>] Update <%= classify(name) %> Success',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const update<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %>] Update <%= classify(name) %> Failure',
  props<{ error: any }>()
);

export const show<%= classify(name) %>DeleteConfirmation = createAction(
  '[<%= classify(name) %>] Show <%= classify(name) %> Delete Confirmation',
  props<{ <%= camelize(name) %>: <%= classify(name) %> }>()
);

export const delete<%= classify(name) %> = createAction(
  '[<%= classify(name) %>] Delete <%= classify(name) %>',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const delete<%= classify(name) %>Revert = createAction(
  '[<%= classify(name) %>] Delete <%= classify(name) %> Revert'
);

export const delete<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %>] Delete <%= classify(name) %> Success',
  props<{ <%= camelize(name) %>Id: number }>()
);

export const delete<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %>] Delete <%= classify(name) %> Failure',
  props<{ error: any }>()
);
