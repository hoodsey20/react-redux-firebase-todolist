import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

import * as tasksActions from '../actions/tasks';
import { ImportanceStatus, ImportanceStatus2Words, reduxActionResults } from '../consts/tasks';
import { getConvertedDate } from '../util';

import TaskMiniCard from '../components/TaskMiniCard';
import TaskForm from '../components/TaskForm';
import RadioFilter from '../components/RadioFilter';
import ChooseOverlay from '../components/ChooseOverlay';

import './TaskList.css';

let notification = null;
Notification.newInstance({
  style: {
    left: '2.5%',
    bottom: '2.5%',
    top: 'auto',
    right: 'auto',
  }
}, (n) => {
  notification = n;
  return notification;
});

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
      showEditForm: false,
      editingTaskID: null,
      importanceFilterValue: null,
    };

    this.fetchTasks = this.props.tasksActions.fetchTasks.bind(this);
    this.createTask = this.props.tasksActions.createTask.bind(this);
    this.deleteTask = this.props.tasksActions.deleteTask.bind(this);
    this.setTaskStatus = this.props.tasksActions.setTaskStatus.bind(this);
    this.updateTaskData = this.props.tasksActions.updateTaskData.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  componentWillReceiveProps(nextProps) {
    const defaultNoticeStyles = {
      backgroundColor: '#45d356',
      color: '#fff',
    };

    const { tasks } = this.props;
    if (!tasks) return;

    if (nextProps.tasks.updateStage === reduxActionResults.SUCCESS &&
      tasks.updateStage !== nextProps.tasks.updateStage) {
      notification.notice({
        content: <span>Данные задачи обновлены</span>,
        style: defaultNoticeStyles,
      });
    }

    if (nextProps.tasks.toggleStage === reduxActionResults.SUCCESS &&
      tasks.toggleStage !== nextProps.tasks.toggleStage) {
      notification.notice({
        content: <span>Состояние задачи обновлено</span>,
        style: defaultNoticeStyles
      });
    }

    if (nextProps.tasks.deleteStage === reduxActionResults.SUCCESS &&
      tasks.deleteStage !== nextProps.tasks.deleteStage) {
      notification.notice({
        content: <span>Задача удалена</span>,
        style: defaultNoticeStyles
      });
    }

    if (nextProps.tasks.createStage === reduxActionResults.SUCCESS &&
      tasks.createStage !== nextProps.tasks.createStage) {
      notification.notice({
        content: <span>Задача создана</span>,
        style: defaultNoticeStyles
      });
    }

    if (nextProps.tasks.actionError) {
      notification.notice({
        content: <span>Ошибка обновления: {nextProps.tasks.actionError}</span>,
        style: { backgroundColor: '#ef266c', color: '#fff' }
      });
    }
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

  editFormButtonHandler = (id) => {
    this.setState(({
      showEditForm: true,
      editingTaskID: id,
    }));
  }

  render() {
    const { tasks, error, stage } = this.props.tasks;
    const {
      importanceFilterValue,
      showAddForm,
      showEditForm,
      editingTaskID
    } = this.state;

    const isLoading = stage === reduxActionResults.LOADING;


    if (isLoading) {
      return <div>Получаю данные...</div>;
    }

    if (error) {
      return <ChooseOverlay title={`Ошибка:${error}. Перезагрузите страницу.`} />;
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
            currentValue={importanceFilterValue}
            onFilterChange={value => this.setState({ importanceFilterValue: value })}
            onFilterReset={() => this.setState({ importanceFilterValue: null })}
          />
        </div>

        <div className="taskList__buttonConainer">
          <button
            className="btn"
            type="button"
            onClick={this.addFormButtonHandler}
          >
            {showAddForm ? 'Скрыть окно добавления' : 'Добавить задачу'}
          </button>
        </div>

        <section className="taskList__list">
          {showAddForm &&
            <TaskForm
              onSubmitHandler={this.createTask}
              onCancelHandler={this.modalCancelHandler}
            />
          }
          {showEditForm &&
            <TaskForm
              onSubmitHandler={this.updateTaskData}
              onCancelHandler={this.modalCancelHandler}
              editingTaskData={Object.assign({}, tasks[editingTaskID])}
              title="Редактировать задачу"
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
                endtime={endtime ? getConvertedDate(endtime) : ''}
                isOverdue={deadline ? now > deadline : false}
                onDelete={this.deleteTask}
                onToggleStatus={this.setTaskStatus}
                onEdit={this.editFormButtonHandler}
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
    deleteTask: PropTypes.func.isRequired,
    setTaskStatus: PropTypes.func.isRequired,
    updateTaskData: PropTypes.func.isRequired,
  }).isRequired,
  tasks: PropTypes.shape({
    stage: PropTypes.string.isRequired,
    updateStage: PropTypes.string,
    toggleStage: PropTypes.string,
    deleteStage: PropTypes.string,
    createStage: PropTypes.string,
    actionError: PropTypes.string,
    error: PropTypes.string,
    tasks: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};
