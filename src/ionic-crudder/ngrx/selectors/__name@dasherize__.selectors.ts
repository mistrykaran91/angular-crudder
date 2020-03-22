import { createSelector, createFeatureSelector } from '@ngrx/store';
import { <%= camelize(name) %>FeatureKey, <%= classify(name) %>State } from '@app/reducers';

export const <%= camelize(name) %>Feature = createFeatureSelector<<%= classify(name) %>State>(
  <%= camelize(name) %>FeatureKey
);

export const get<%= classify(name) %>s = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.<%= camelize(name) %>s
);

export const getCurrent<%= classify(name) %> = createSelector(
  <%= camelize(name) %>Feature,
  state => state && state.current<%= classify(name) %>
);

export const get<%= classify(name) %> = createSelector(get<%= classify(name) %>s, (<%= camelize(name) %>s, props) => {
  const { <%= camelize(name) %>Id } = props;
  return <%= camelize(name) %>s.find(r => r.id === +<%= camelize(name) %>Id);
});

export const getIs<%= classify(name) %>Empty = createSelector(
  get<%= classify(name) %>s,
  <%= camelize(name) %>s => <%= camelize(name) %>s && <%= camelize(name) %>s.length === 0
);
