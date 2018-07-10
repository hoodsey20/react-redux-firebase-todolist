import { reduxActionTypes, reduxActionResults } from '../consts/tasks';

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

const {
  LOADING,
  SUCCESS,
  FAIL,
} = reduxActionResults;

const initialState = {
  error: null,
  tasks: null,
  stage: LOADING,
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
        stage: LOADING,
      };

    case FETCH_TASKS:
      return {
        ...state,
        error: null,
        stage: SUCCESS,
        tasks: action.payload
      };

    case FAIL_FETCH_TASKS:
      return {
        ...state,
        stage: FAIL,
        error: action.payload
      };

    case CREATE_TASK:
      return {
        ...state,
        actionError: null,
        createStage: LOADING,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        createStage: SUCCESS,
      };

    case CREATE_TASK_FAIL:
      return {
        ...state,
        createStage: FAIL,
        actionError: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        actionError: null,
        deleteStage: LOADING,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        deleteStage: SUCCESS,
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
        deleteStage: FAIL,
        actionError: action.payload,
      };

    case TOGGLE_TASK_STATE:
      return {
        ...state,
        actionError: null,
        toggleStage: LOADING,
      };

    case TOGGLE_TASK_STATE_SUCCESS:
      return {
        ...state,
        actionError: null,
        toggleStage: SUCCESS,
      };

    case TOGGLE_TASK_STATE_FAIL:
      return {
        ...state,
        toggleStage: FAIL,
        actionError: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        actionError: null,
        updateStage: LOADING,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        actionError: null,
        updateStage: SUCCESS,
      };

    case UPDATE_TASK_FAIL:
      return {
        ...state,
        updateStage: FAIL,
        actionError: action.payload,
      };

    default:
      return state;
  }
}
