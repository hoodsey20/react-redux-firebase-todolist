export const reduxActionTypes = {
  REQUEST_TASKS: 'REQUEST_TASKS',
  FETCH_TASKS: 'FETCH_TASKS',
  FAIL_FETCH_TASKS: 'FAIL_FETCH_TASKS',

  CREATE_TASK: 'CREATE_TASK',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAIL: 'CREATE_TASK_FAIL',
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
