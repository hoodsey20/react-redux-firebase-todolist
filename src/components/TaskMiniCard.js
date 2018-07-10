import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskStatus, TaskStatus2Words, ImportanceStatus2Words } from '../consts/tasks';
import ChooseOverlay from './ChooseOverlay';

import './TaskMiniCard.css';


const OverlayType = {
  DELETE: 'DELETE',
  COMPLETE: 'COMPLETE',
  REOPEN: 'REOPEN',
};

class TaskMiniCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      this.setState({ showOverlay: false });
    }
  }


  overlayCloseHandler = () => this.setState({ showOverlay: false });
  delOverlayBtnHandler = () => this.setState({ showOverlay: OverlayType.DELETE });
  completeOverlayBtnHandler = () => this.setState({ showOverlay: OverlayType.COMPLETE });
  reopenOverlayBtnHandler = () => this.setState({ showOverlay: OverlayType.REOPEN });

  render() {
    const {
      id,
      title,
      description,
      status,
      importance,
      deadline,
      endtime,
      isOverdue,
      onDelete,
      onToggleStatus,
      onEdit,
    } = this.props;

    const isOpen = status === TaskStatus.OPEN;

    const { showOverlay } = this.state;

    let overlay = null;

    switch (showOverlay) {
      case OverlayType.DELETE:
        overlay = <ChooseOverlay actionName="Удалить" onSubmit={() => onDelete(id)} onCancel={this.overlayCloseHandler} />;
        break;

      case OverlayType.COMPLETE:
        overlay = <ChooseOverlay actionName="Завершить" onCancel={this.overlayCloseHandler} onSubmit={() => onToggleStatus(id, TaskStatus.DONE)} />;
        break;

      case OverlayType.REOPEN:
        overlay = <ChooseOverlay actionName="Возобновить" onCancel={this.overlayCloseHandler} onSubmit={() => onToggleStatus(id, TaskStatus.OPEN)} />;
        break;

      default:
        break;
    }


    return (
      <article className={`taskMiniCard taskMiniCard_status_${status.toLowerCase()} ${isOverdue && isOpen ? 'isOverdue' : ''}`}>
        {showOverlay && overlay}
        <div className="taskMiniCard__wrap">
          <header className="taskMiniCard__header">
            <div className="taskMiniCard__infoContainer">
              <p className="taskMiniCard__info"><span>Статус:</span> <span>{TaskStatus2Words.get(status)}</span></p>
              <p className="taskMiniCard__info"><span>Важность:</span> <span>{ImportanceStatus2Words.get(importance)}</span></p>
              {deadline &&
                <p className="taskMiniCard__info"><span>Дедлайн:</span> <span>{deadline}</span></p>
              }
              {!isOpen &&
                <p className="taskMiniCard__info"><span>Завершена:</span> <span>{endtime}</span></p>
              }
            </div>
            <h2 className="taskMiniCard__title">{title}</h2>
          </header>
          <p className="taskMiniCard__description">{description}</p>

          <footer className="taskMiniCard__footer">
            {isOpen &&
              <button
                className="btn btn_style_success"
                type="button"
                onClick={this.completeOverlayBtnHandler}
              >
                Завершить
              </button>
            }

            {!isOpen &&
              <button
                className="btn btn_style_base"
                type="button"
                onClick={this.reopenOverlayBtnHandler}
              >
                Возобновить
              </button>
            }

            <button
              className="btn"
              type="button"
              onClick={() => onEdit(id)}
            >
              Редактировать
            </button>
            <button
              className="btn btn_style_danger"
              type="button"
              onClick={this.delOverlayBtnHandler}
            >
              Удалить
            </button>
          </footer>
        </div>
      </article>
    );
  }
}

export default TaskMiniCard;

TaskMiniCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  importance: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  endtime: PropTypes.string.isRequired,
  isOverdue: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
