import { createSelector, createFeatureSelector } from '@ngrx/store';
import { <%= camelize(name) %>FeatureKey, <%= classify(name) %>State } from '@app/reducers';

export const <%= camelize(name) %>Feature = createFeatureSelector<<%= classify(name) %>State>(
  <%= camelize(name) %>FeatureKey
);

export const get<%= classify(name) %>s = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.<%= getPluralPropertyName(name,pluralName) %>
);

export const getCurrent<%= classify(name) %> = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.current<%= classify(name) %>
);

export const get<%= classify(name) %> = createSelector(get<%= classify(name) %>s, (<%= getPluralPropertyName(name,pluralName) %>, props) => {
  const { <%= camelize(name) %>Id } = props;
  return <%= getPluralPropertyName(name,pluralName) %>.find(r => r.id === +<%= camelize(name) %>Id);
});

export const getIs<%= classify(name) %>Empty = createSelector(
  get<%= classify(name) %>s,
  <%= getPluralPropertyName(name,pluralName) %> => <%= getPluralPropertyName(name,pluralName) %> && <%= getPluralPropertyName(name,pluralName) %>.length === 0
);
