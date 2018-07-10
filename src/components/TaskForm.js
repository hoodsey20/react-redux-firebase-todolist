import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImportanceStatus, ImportanceStatus2Words, TaskStatus } from '../consts/tasks';
import { getInputFormatDate } from '../util';

import './TaskForm.css';

const getInitialState = () => {
  return {
    title: '',
    description: '',
    deadline: '',
    importance: '',
    allowSubmit: false,
  };
};

const requiredFields = ['title', 'description', 'importance'];

class TaskForm extends Component {
  constructor(props) {
    super(props);
    const initialState = getInitialState();
    const { editingTaskData } = this.props;
    if (editingTaskData) {
      if (editingTaskData.deadline) {
        editingTaskData.deadline = getInputFormatDate(editingTaskData.deadline);
      }
      this.state = Object.assign(initialState, this.props.editingTaskData);
    } else {
      this.state = initialState;
    }

    this.onSubmitHandler = this.props.onSubmitHandler.bind(this);
    this.onCancelHandler = this.props.onCancelHandler.bind(this);
  }

  componentDidMount = () => {
    this.checkReadyForSubmit();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const id = this.state.id ? this.state.id : +new Date();
    const taskDeadline = this.state.deadline ? +new Date(this.state.deadline) : null;
    this.onSubmitHandler(id, {
      id,
      title: this.state.title,
      description: this.state.description,
      deadline: taskDeadline,
      importance: this.state.importance,
      status: TaskStatus.OPEN,
    });

    if (!this.state.id) {
      this.setState(getInitialState());
    }
  }

  handleReset = () => {
    this.onCancelHandler();
    this.setState(getInitialState());
  }

  checkReadyForSubmit = () => {
    const isAllRequiredDataFilled = requiredFields.every(item => this.state[item]);
    this.setState({ allowSubmit: isAllRequiredDataFilled });
  }

  handleChangeForm = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.checkReadyForSubmit();
    });
  }

  render() {
    const importanceStatusList = Object.keys(ImportanceStatus).map(key => ImportanceStatus[key]);

    return (
      <div className="taskFormOuter">
        <form
          className="taskForm form"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          onChange={this.handleChangeForm}
        >
          <h2 className="form__title">{this.props.title}</h2>
          <div className="form__item">
            <label htmlFor="taskFormName">Название задачи</label>
            <input
              name="title"
              type="text"
              defaultValue={this.state.title}
              id="taskFormName"
            />
          </div>

          <div className="form__item">
            <label htmlFor="taskFormDescription">Описание</label>
            <textarea
              name="description"
              rows="5"
              type="text"
              defaultValue={this.state.description}
              id="taskFormDescription"
            />
          </div>

          <div className="form__item">
            <label htmlFor="taskFormDate">Дата</label>
            <input
              name="deadline"
              type="date"
              defaultValue={this.state.deadline}
              id="taskFormDate"
            />
          </div>

          <div className="form__item taskForm__radioContainer">
            {importanceStatusList.map((item) => {
              return (
                <label key={item}>
                  <input
                    name="importance"
                    type="radio"
                    value={item}
                    defaultChecked={item === this.state.importance}
                  />
                  <span>{ImportanceStatus2Words.get(item)}</span>
                </label>
              );
            })}
          </div>

          <div className="taskForm__buttonsContainer">
            <button
              className="btn btn_style_success"
              type="submit"
              disabled={!this.state.allowSubmit}
            >
              Сохранить
            </button>
            <button className="btn btn_style_base" type="reset">Закрыть</button>
          </div>

        </form>
      </div>
    );
  }
}

export default TaskForm;

TaskForm.propTypes = {
  title: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
  editingTaskData: PropTypes.shape({
    id: PropTypes.number,
    deadline: PropTypes.number,
    description: PropTypes.string,
    title: PropTypes.string,
    importance: PropTypes.string,
  }),
};

TaskForm.defaultProps = {
  title: 'Добавить задачу',
  editingTaskData: null,
};
