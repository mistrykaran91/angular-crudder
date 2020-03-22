import { createReducer, on } from '@ngrx/store';
import * as <%= classify(name) %>Actions from '@app/actions';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

export const <%= camelize(name) %>FeatureKey = '<%= camelize(name) %>';

const initialize<%= classify(name) %>: <%= classify(name) %> = { };

export interface <%= classify(name) %>State {
    <%= classify(name) %>s: Array<<%= classify(name) %>>;
  current<%= classify(name) %>: <%= classify(name) %>;
}

export const <%= classify(name) %>State: <%= classify(name) %>State = {
  <%= classify(name) %>s: null,
  current<%= classify(name) %>: null
};

const <%= classify(name) %>Reducer = createReducer(
  <%= classify(name) %>State,
  on(<%= classify(name) %>Actions.load<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>Success, (state, action) => {
    return {
      ...state,
      <%= classify(name) %>s: action.<%= classify(name) %>s
    };
  }),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>ById, state => state),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>ByIdSuccess, (state, action) => {
    return {
      ...state,
      current<%= classify(name) %>:
        action && action.<%= classify(name) %> ? action.<%= classify(name) %> : initialize<%= classify(name) %>
    };
  }),

  on(<%= classify(name) %>Actions.setCurrent<%= classify(name) %>, (state, action) => {
    return {
      ...state,
      current<%= classify(name) %>:
        action && action.<%= classify(name) %> ? action.<%= classify(name) %> : initialize<%= classify(name) %>
    };
  }),

  on(<%= classify(name) %>Actions.load<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>Success, (state, action) => {
    return { ...state, <%= classify(name) %>s: [...state.<%= classify(name) %>s, action.<%= classify(name) %>] };
  }),
  on(<%= classify(name) %>Actions.create<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>Success, (state, action) => {
    const updated<%= classify(name) %>s = state.<%= classify(name) %>s.map(item =>
      action.<%= classify(name) %>.id === item.id ? action.<%= classify(name) %> : item
    );

    return { ...state, <%= classify(name) %>s: updated<%= classify(name) %>s };
  }),
  on(<%= classify(name) %>Actions.update<%= classify(name) %>Failure, state => state),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>, state => state),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>Success, (state, action) => {
    return {
      ...state,
      <%= classify(name) %>s: state.<%= classify(name) %>s.filter(item => item.id !== action.<%= classify(name) %>Id)
    };
  }),
  on(<%= classify(name) %>Actions.delete<%= classify(name) %>Failure, state => state)
);

export function reducer(state, action) {
  return <%= classify(name) %>Reducer(state, action);
}
