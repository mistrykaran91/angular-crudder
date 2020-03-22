import { createReducer, on } from '@ngrx/store';
import * as SubjectActions from '@app/actions';
import { Subject } from '@interfaces/subject.interface';

export const subjectFeatureKey = 'subject';

const initializeSubject: Subject = { };

export interface SubjectState {
    Subjects: Array<Subject>;
  currentSubject: Subject;
}

export const SubjectState: SubjectState = {
  Subjects: null,
  currentSubject: null
};

const SubjectReducer = createReducer(
  SubjectState,
  on(SubjectActions.loadSubject, state => state),
  on(SubjectActions.loadSubjectSuccess, (state, action) => {
    return {
      ...state,
      Subjects: action.Subjects
    };
  }),
  on(SubjectActions.loadSubjectById, state => state),
  on(SubjectActions.loadSubjectByIdSuccess, (state, action) => {
    return {
      ...state,
      currentSubject:
        action && action.Subject ? action.Subject : initializeSubject
    };
  }),

  on(SubjectActions.setCurrentSubject, (state, action) => {
    return {
      ...state,
      currentSubject:
        action && action.Subject ? action.Subject : initializeSubject
    };
  }),

  on(SubjectActions.loadSubjectFailure, state => state),
  on(SubjectActions.createSubject, state => state),
  on(SubjectActions.createSubjectSuccess, (state, action) => {
    return { ...state, Subjects: [...state.Subjects, action.Subject] };
  }),
  on(SubjectActions.createSubjectFailure, state => state),
  on(SubjectActions.updateSubject, state => state),
  on(SubjectActions.updateSubjectSuccess, (state, action) => {
    const updatedSubjects = state.Subjects.map(item =>
      action.Subject.id === item.id ? action.Subject : item
    );

    return { ...state, Subjects: updatedSubjects };
  }),
  on(SubjectActions.updateSubjectFailure, state => state),
  on(SubjectActions.deleteSubject, state => state),
  on(SubjectActions.deleteSubjectSuccess, (state, action) => {
    return {
      ...state,
      Subjects: state.Subjects.filter(item => item.id !== action.SubjectId)
    };
  }),
  on(SubjectActions.deleteSubjectFailure, state => state)
);

export function reducer(state, action) {
  return SubjectReducer(state, action);
}
