import React from 'react';
import PropTypes from 'prop-types';

import './ChooseOverlay.css';

const ChooseOverlay = ({
  actionName,
  cancelName,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="chooseOverlay">
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
  );
};

export default ChooseOverlay;

ChooseOverlay.propTypes = {
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
};
