import React from 'react';
import PropTypes from 'prop-types';

import './RadioFilter.css';

const RadioFilter = ({
  name,
  values,
  dictionary,
  currentValue,
  onFilterChange,
  onFilterReset,
  title,
}) => {
  const changeHandler = (evt) => {
    onFilterChange(evt.target.value);
  };

  return (
    <div className="radioFilter">
      <form
        onChange={changeHandler}
        onReset={onFilterReset}
        className="form radioFilter__form"
      >
        <h2 className="radioFilter__title">{title}</h2>
        {values.map((item) => {
          return (
            <label key={item}>
              <input
                name={name}
                type="radio"
                value={item}
                checked={item === currentValue}
              />
              <span>{dictionary.get(item)}</span>
            </label>
          );
        })}
        <button type="reset" className="btn btn_style_base">Сбросить фильтр</button>
      </form>
    </div>
  );
};

export default RadioFilter;

RadioFilter.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
  values: PropTypes.PropTypes.arrayOf(PropTypes.string).isRequired,
  dictionary: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
};

RadioFilter.defaultProps = {
  currentValue: null,
};
