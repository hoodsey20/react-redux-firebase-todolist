import React from 'react';
import PropTypes from 'prop-types';
import { TaskStatus, TaskStatus2Words, ImportanceStatus2Words } from '../consts/tasks';

import './TaskMiniCard.css';

const TaskMiniCard = ({
  title,
  description,
  status,
  importance,
  deadline,
  endtime,
  isOverdue
}) => {
  const isOpen = status === TaskStatus.OPEN;

  return (
    <article className={`taskMiniCard taskMiniCard_status_${status.toLowerCase()} ${isOverdue && isOpen ? 'isOverdue' : ''}`}>
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
            >
              Завершить
            </button>
          }

          {!isOpen &&
            <button
              className="btn btn_style_base"
              type="button"
            >
              Возобновить
            </button>
          }

          <button
            className="btn"
            type="button"
          >
            Редактировать
          </button>
          <button
            className="btn btn_style_danger"
            type="button"
          >
            Удалить
          </button>
        </footer>
      </div>
    </article>
  );
};

export default TaskMiniCard;

TaskMiniCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  importance: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  endtime: PropTypes.string.isRequired,
  isOverdue: PropTypes.bool.isRequired,
};
