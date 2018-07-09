import firebase from 'firebase';
import { FB_CONFIG } from '../consts/firebase';
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

firebase.initializeApp(FB_CONFIG);
const toDoListRef = firebase.database().ref('todolist');

/*
function writeUserData(taskData) {
  const id = +new Date();
  firebase.database().ref('todolist/' + id).set(taskData);
}
*/

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

export function createTask(timecode, taskData) {
  return (dispatch) => {
    dispatch({ type: CREATE_TASK });

    try {
      firebase.database().ref(`todolist/${timecode}`).set(taskData, (error) => {
        if (error) {
          console.log(error);
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


export function deleteTask(timecode) {
  return (dispatch) => {
    dispatch({ type: DELETE_TASK });

    try {
      firebase.database().ref(`todolist/${timecode}`).remove((error) => {
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
