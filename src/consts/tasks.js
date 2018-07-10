export const reduxActionTypes = {
  REQUEST_TASKS: 'REQUEST_TASKS',
  FETCH_TASKS: 'FETCH_TASKS',
  FAIL_FETCH_TASKS: 'FAIL_FETCH_TASKS',

  CREATE_TASK: 'CREATE_TASK',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAIL: 'CREATE_TASK_FAIL',

  DELETE_TASK: 'DELETE_TASK',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_FAIL: 'DELETE_TASK_FAIL',

  TOGGLE_TASK_STATE: 'TOGGLE_TASK_STATE',
  TOGGLE_TASK_STATE_SUCCESS: 'TOGGLE_TASK_STATE_SUCCESS',
  TOGGLE_TASK_STATE_FAIL: 'TOGGLE_TASK_STATE_FAIL',

  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_FAIL: 'UPDATE_TASK_FAIL',
};

export const reduxActionResults = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

export const TaskStatus = {
  OPEN: 'OPEN',
  DONE: 'DONE',
};

export const TaskStatus2Words = new Map();
TaskStatus2Words.set(TaskStatus.OPEN, 'Открыта');
TaskStatus2Words.set(TaskStatus.DONE, 'Завершена');


export const ImportanceStatus = {
  NORMAL: 'NORMAL',
  IMPORTANT: 'IMPORTANT',
  CRITICAL: 'CRITICAL',
};

export const ImportanceStatus2Words = new Map();
ImportanceStatus2Words.set(ImportanceStatus.NORMAL, 'Обычная');
ImportanceStatus2Words.set(ImportanceStatus.IMPORTANT, 'Важная');
ImportanceStatus2Words.set(ImportanceStatus.CRITICAL, 'Очень важная');
