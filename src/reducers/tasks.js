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
} = reduxActionTypes;

const initialState = {
  tasks: null,
  error: null,
  stage: 'loading',
  createStage: null,
  createStageError: null,
  deleteStage: null,
  deleteStageError: null
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
        deleteStageError: null,
        createStage: 'loading',
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        deleteStageError: null,
        createStage: 'success',
      };

    case CREATE_TASK_FAIL:
      return {
        ...state,
        createStage: 'fail',
        createStageError: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        deleteStageError: null,
        deleteStage: 'loading',
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteStageError: null,
        deleteStage: 'success',
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
        deleteStage: 'fail',
        deleteStageError: action.payload,
      };

    default:
      return state;
  }
}
