import { reduxActionTypes } from '../consts/tasks';

const {
  REQUEST_TASKS,
  FETCH_TASKS,
  FAIL_FETCH_TASKS,

  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,

  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,

  TOGGLE_TASK_STATE,
  TOGGLE_TASK_STATE_SUCCESS,
  TOGGLE_TASK_STATE_FAIL,
} = reduxActionTypes;

const initialState = {
  tasks: null,
  error: null,
  stage: 'loading',

  createStage: null,
  createError: null,

  deleteStage: null,
  deleteError: null,

  toggleStage: null,
  toggleError: null,
};

export default function rating(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TASKS:
      return {
        ...state,
        error: null,
        stage: 'loading',
      };

    case FETCH_TASKS:
      return {
        ...state,
        error: null,
        stage: 'success',
        tasks: action.payload
      };

    case FAIL_FETCH_TASKS:
      return {
        ...state,
        stage: 'fail',
        error: action.payload
      };

    case CREATE_TASK:
      return {
        ...state,
        deleteError: null,
        createStage: 'loading',
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        deleteError: null,
        createStage: 'success',
      };

    case CREATE_TASK_FAIL:
      return {
        ...state,
        createStage: 'fail',
        createError: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        deleteError: null,
        deleteStage: 'loading',
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteError: null,
        deleteStage: 'success',
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
        deleteStage: 'fail',
        deleteError: action.payload,
      };

    case TOGGLE_TASK_STATE:
      return {
        ...state,
        toggleError: null,
        toggleStage: 'loading',
      };

    case TOGGLE_TASK_STATE_SUCCESS:
      return {
        ...state,
        toggleError: null,
        toggleStage: 'success',
      };

    case TOGGLE_TASK_STATE_FAIL:
      return {
        ...state,
        toggleStage: 'fail',
        toggleError: action.payload,
      };

    default:
      return state;
  }
}
