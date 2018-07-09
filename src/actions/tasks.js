import firebase from 'firebase';
import { FB_CONFIG } from '../consts/firebase';
import { reduxActionTypes, TaskStatus } from '../consts/tasks';

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

firebase.initializeApp(FB_CONFIG);
const toDoListRef = firebase.database().ref('todolist');


export function fetchTasks() {
  return (dispatch) => {
    dispatch({ type: REQUEST_TASKS });

    try {
      toDoListRef.on('value', (snapshot) => {
        dispatch({
          type: FETCH_TASKS,
          payload: snapshot.val(),
        });
      });
    } catch (error) {
      dispatch({
        type: FAIL_FETCH_TASKS,
        payload: error.message,
      });
    }
  };
}

export function createTask(taskId, taskData) {
  return (dispatch) => {
    dispatch({ type: CREATE_TASK });

    try {
      firebase.database().ref(`todolist/${taskId}`).set(taskData, (error) => {
        if (error) {
          dispatch({
            type: CREATE_TASK_FAIL,
            payload: error.message,
          });
        } else {
          dispatch({ type: CREATE_TASK_SUCCESS });
        }
      });
    } catch (error) {
      dispatch({
        type: CREATE_TASK_FAIL,
        payload: error.message,
      });
    }
  };
}

export function deleteTask(taskId) {
  return (dispatch) => {
    dispatch({ type: DELETE_TASK });

    try {
      firebase.database().ref(`todolist/${taskId}`).remove((error) => {
        if (error) {
          dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.message,
          });
        } else {
          dispatch({ type: DELETE_TASK_SUCCESS });
        }
      });
    } catch (error) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: error.message,
      });
    }
  };
}

export function setTaskStatus(taskId, taskStatus) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_TASK_STATE });

    const freshData = {};
    freshData.status = taskStatus;
    if (taskStatus === TaskStatus.DONE) {
      freshData.endtime = +new Date();
    }

    try {
      firebase.database().ref(`todolist/${taskId}`).update(freshData, (error) => {
        if (error) {
          dispatch({
            type: TOGGLE_TASK_STATE_FAIL,
            payload: error.message,
          });
        } else {
          dispatch({ type: TOGGLE_TASK_STATE_SUCCESS });
        }
      });
    } catch (error) {
      dispatch({
        type: TOGGLE_TASK_STATE_FAIL,
        payload: error.message,
      });
    }
  };
}
