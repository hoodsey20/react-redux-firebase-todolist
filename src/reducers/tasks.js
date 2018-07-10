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

  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
} = reduxActionTypes;

const initialState = {
  error: null,
  tasks: null,
  stage: 'loading',
  actionError: null,
  createStage: null,
  deleteStage: null,
  toggleStage: null,
  updateStage: null,
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
        actionError: null,
        createStage: 'loading',
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        createStage: 'success',
      };

    case CREATE_TASK_FAIL:
      return {
        ...state,
        createStage: 'fail',
        actionError: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        actionError: null,
        deleteStage: 'loading',
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        deleteStage: 'success',
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
        deleteStage: 'fail',
        actionError: action.payload,
      };

    case TOGGLE_TASK_STATE:
      return {
        ...state,
        actionError: null,
        toggleStage: 'loading',
      };

    case TOGGLE_TASK_STATE_SUCCESS:
      return {
        ...state,
        actionError: null,
        toggleStage: 'success',
      };

    case TOGGLE_TASK_STATE_FAIL:
      return {
        ...state,
        toggleStage: 'fail',
        actionError: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        actionError: null,
        updateStage: 'loading',
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        updateStage: 'success',
      };

    case UPDATE_TASK_FAIL:
      return {
        ...state,
        updateStage: 'fail',
        actionError: action.payload,
      };

    default:
      return state;
  }
}
