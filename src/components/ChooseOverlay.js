import React from 'react';
import PropTypes from 'prop-types';

import './ChooseOverlay.css';

const ChooseOverlay = ({
  title,
  actionName,
  cancelName,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="chooseOverlay">
      {title &&
        <h2 className="chooseOverlay__title">{title}</h2>
      }
      <div className="chooseOverlay__buttonsContainer">
        {onSubmit &&
          <button
            type="button"
            className="btn btn_style_success"
            onClick={onSubmit}
          >
            {actionName}
          </button>
        }
        {onCancel &&
          <button
            type="button"
            className="btn btn_style_base"
            onClick={onCancel}
          >
            {cancelName}
          </button>
        }
      </div>
    </div>
  );
};

export default ChooseOverlay;

ChooseOverlay.propTypes = {
  title: PropTypes.string,
  actionName: PropTypes.string,
  cancelName: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

ChooseOverlay.defaultProps = {
  actionName: 'Подтвердить',
  cancelName: 'Отмена',
  onSubmit: null,
  onCancel: null,
  title: null,
};
