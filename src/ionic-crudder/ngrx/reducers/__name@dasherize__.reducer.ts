import { createReducer, on } from '@ngrx/store';
import * as <%= classify(name) %>Actions from '@app/actions';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

export const <%= camelize(name) %>FeatureKey = '<%= camelize(name) %>';

<%= intialiseModel(schemaPath,name) %>

export interface <%= classify(name) %>State {
    <%= camelize(name) %>s: Array<<%= classify(name) %>>;
  current<%= classify(name) %>: <%= classify(name) %>;
}

export const <%= classify(name) %>State: <%= classify(name) %>State = {
  <%= camelize(name) %>s: null,
  current<%= classify(name) %>: null
};

const <%= classify(name) %>Reducer = createReducer(
  <%= classify(name) %>State,
  on(<%= classify(name) %>Actions.load<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>Success, (state, action) => {
    return {
      ...state,
      <%= camelize(name) %>s: action.<%= camelize(name) %>s
    };
  }),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>ById, state => state),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>ByIdSuccess, (state, action) => {
    return {
      ...state,
      current<%= classify(name) %>:
        action && action.<%= camelize(name) %> ? action.<%= camelize(name) %> : initialize<%= classify(name) %>
    };
  }),

  on(<%= classify(name) %>Actions.setCurrent<%= classify(name) %>, (state, action) => {
    return {
      ...state,
      current<%= classify(name) %>:
        action && action.<%= camelize(name) %> ? action.<%= camelize(name) %> : initialize<%= classify(name) %>
    };
  }),

  on(<%= classify(name) %>Actions.load<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>Success, (state, action) => {
    return { ...state, <%= camelize(name) %>s: [...state.<%= camelize(name) %>s, action.<%= camelize(name) %>] };
  }),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>Success, (state, action) => {
    const updated<%= classify(name) %>s = state.<%= camelize(name) %>s.map(item =>
      action.<%= camelize(name) %>.id === item.id ? action.<%= camelize(name) %> : item
    );

    return { ...state, <%= camelize(name) %>s: updated<%= classify(name) %>s };
  }),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>Success, (state, action) => {
    return {
      ...state,
      <%= camelize(name) %>s: state.<%= camelize(name) %>s.filter(item => item.id !== action.<%= camelize(name) %>Id)
    };
  }),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>Failure, state => state)
);

export function reducer(state, action) {
  return <%= classify(name) %>Reducer(state, action);
}
