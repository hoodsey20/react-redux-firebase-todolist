import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImportanceStatus, ImportanceStatus2Words, TaskStatus } from '../consts/tasks';

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
    this.state = getInitialState();

    this.onSubmitHandler = this.props.onSubmitHandler.bind(this);
    this.onCancelHandler = this.props.onCancelHandler.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const now = +new Date();

    this.onSubmitHandler(now, {
      id: now,
      title: this.state.title,
      description: this.state.description,
      deadline: +new Date(this.state.deadline),
      importance: this.state.importance,
      status: TaskStatus.OPEN,
    });

    this.setState(getInitialState());
  }

  handleReset = () => {
    this.onCancelHandler();
    this.setState(getInitialState());
  }

  handleChangeForm = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const isAllRequiredDataFilled = requiredFields.every(item => this.state[item]);
      this.setState({ allowSubmit: isAllRequiredDataFilled });
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
              value={this.state.title}
              id="taskFormName"
            />
          </div>

          <div className="form__item">
            <label htmlFor="taskFormDescription">Описание</label>
            <textarea
              name="description"
              rows="5"
              type="text"
              value={this.state.description}
              id="taskFormDescription"
            />
          </div>

          <div className="form__item">
            <label htmlFor="taskFormDate">Дата</label>
            <input
              name="deadline"
              type="date"
              value={this.state.deadline}
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
            <button className="btn btn_style_base" type="reset">Отменить</button>
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
};

TaskForm.defaultProps = {
  title: 'Добавить задачу'
};
