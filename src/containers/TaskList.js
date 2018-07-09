import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as tasksActions from '../actions/tasks';
import { ImportanceStatus, ImportanceStatus2Words } from '../consts/tasks';

import { getConvertedDate } from '../util';
import TaskMiniCard from '../components/TaskMiniCard';
import TaskForm from '../components/TaskForm';
import RadioFilter from '../components/RadioFilter';

import './TaskList.css';


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      showEditForm: false,
      importanceFilterValue: null,
    };

    this.fetchTasks = this.props.tasksActions.fetchTasks.bind(this);
    this.createTask = this.props.tasksActions.createTask.bind(this);
  }


  componentDidMount() {
    this.fetchTasks();
  }

  modalCancelHandler = () => {
    this.setState({
      showAddForm: false,
      showEditForm: false
    });
  }

  addFormButtonHandler = () => {
    this.setState(prevState => ({
      showAddForm: !prevState.showAddForm
    }));
  }

  filterChangeHandler = (value) => {
    this.setState({
      importanceFilterValue: value,
    });
  }

  filterResetHandler = () => {
    this.setState({
      importanceFilterValue: null,
    });
  }

  render() {
    const { tasks, error, stage } = this.props.tasks;
    const { importanceFilterValue } = this.state;

    const isLoading = stage === 'loading';


    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    if (error) {
      return <div>Ошибка: {error}</div>;
    }

    let taskList = Object.keys(tasks).map(i => tasks[i]);

    if (importanceFilterValue) {
      taskList = taskList.filter(item => item.importance === importanceFilterValue);
    }

    return (
      <div className="taskList">
        <h1 className="taskList__title">Список задач</h1>

        <div className="taskList__filterContainer">
          <RadioFilter
            values={Object.keys(ImportanceStatus).map(key => ImportanceStatus[key])}
            dictionary={ImportanceStatus2Words}
            name="importance"
            title="Показывать только со статусом:"
            currentValue={this.state.importanceFilterValue}
            onFilterChange={this.filterChangeHandler}
            onFilterReset={this.filterResetHandler}
          />
        </div>

        <div className="taskList__buttonConainer">
          <button
            className="btn"
            type="button"
            onClick={this.addFormButtonHandler}
          >
            {this.state.showAddForm ? 'Скрыть окно добавления' : 'Добавить задачу'}
          </button>
        </div>

        <section className="taskList__list">
          {this.state.showAddForm &&
            <TaskForm
              onSubmitHandler={this.createTask}
              onCancelHandler={this.modalCancelHandler}
            />
          }
          {taskList.map((task) => {
            const now = +new Date();
            const {
              title,
              description,
              status,
              importance,
              deadline,
              endtime,
              id,
            } = task;

            return (
              <TaskMiniCard
                title={title}
                description={description}
                status={status}
                importance={importance}
                id={id}
                key={id}
                deadline={deadline ? getConvertedDate(deadline) : ''}
                endtime={endtime ? getConvertedDate(deadline) : ''}
                isOverdue={deadline ? now > deadline : false}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tasksActions: bindActionCreators(tasksActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

TaskList.propTypes = {
  tasksActions: PropTypes.shape({
    fetchTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
  }).isRequired,
  tasks: PropTypes.shape({
    stage: PropTypes.string.isRequired,
    error: PropTypes.string,
    tasks: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};
