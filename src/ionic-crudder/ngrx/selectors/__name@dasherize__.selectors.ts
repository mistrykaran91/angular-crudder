import { createSelector, createFeatureSelector } from '@ngrx/store';
import { <%= camelize(name) %>FeatureKey, <%= classify(name) %>State } from '@app/reducers';

export const <%= camelize(name) %>Feature = createFeatureSelector<<%= classify(name) %>State>(
  <%= camelize(name) %>FeatureKey
);

export const get<%= getPluralPropertyName(name,pluralName,'true') %> = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.<%= getPluralPropertyName(name,pluralName) %>
);

export const getCurrent<%= classify(name) %> = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.current<%= classify(name) %>
);

export const get<%= classify(name) %> = createSelector(get<%= getPluralPropertyName(name,pluralName,'true') %>, (<%= getPluralPropertyName(name,pluralName) %>, props) => {
  const { <%= camelize(name) %>Id } = props;
  return <%= getPluralPropertyName(name,pluralName) %>.find(r => r.id === +<%= camelize(name) %>Id);
});

export const getIs<%= classify(name) %>Empty = createSelector(
  get<%= getPluralPropertyName(name,pluralName,'true') %>,
  <%= getPluralPropertyName(name,pluralName) %> => <%= getPluralPropertyName(name,pluralName) %> && <%= getPluralPropertyName(name,pluralName) %>.length === 0
);

export const get<%= classify(name) %>GenId = createSelector(get<%= getPluralPropertyName(name,pluralName,'true') %>, <%= getPluralPropertyName(name,pluralName) %> => {
  return !<%= getPluralPropertyName(name,pluralName) %> || <%= getPluralPropertyName(name,pluralName) %>.length === 0 ? 11 : <%= getPluralPropertyName(name,pluralName) %>.length + 5;
});
