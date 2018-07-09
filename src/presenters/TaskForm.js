import React, { Component } from 'react';

import { ImportanceStatus, ImportanceStatus2Words } from '../consts/tasks';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      deadline: '',
      importance: '',
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeImportance = this.handleChangeImportance.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeDate(event) {
    this.setState({ deadline: event.target.value });
  }

  handleChangeImportance(event) {
    console.log(event.target.value);
    this.setState({ importance: event.target.value });
  }

  handleSubmit(event) {
    alert(`A name was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    const importanceStatusList = Object.keys(ImportanceStatus).map(key => ImportanceStatus[key]);

    return (
      <div className="taskFormOuter">
        <form className="taskForm" onSubmit={this.handleSubmit}>
          <h2>Заголовок который надо вынести в props</h2>

          <label htmlFor="taskFormName">Название задачи</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChangeTitle}
            id="taskFormName"
          />

          <label htmlFor="taskFormDescription">Описание</label>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            id="taskFormDescription"
          />

          <label htmlFor="taskFormDate">Дата</label>
          <input
            type="date"
            value={this.state.deadline}
            onChange={this.handleChangeDate}
            id="taskFormDate"
          />

          {importanceStatusList.map((item) => {
            return (
              <label key={item}>
                <input
                  name="importance"
                  type="radio"
                  value={item}
                  onChange={this.handleChangeImportance}
                  checked={this.state.importance === item}
                />
                <span>{ImportanceStatus2Words.get(item)}</span>
              </label>
            );
          })}

          <button className="btn btn_style_success" type="submit">Сохранить</button>
        </form>
      </div>
    );
  }
}

export default TaskForm;
