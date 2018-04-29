import React from 'react';
import PropTypes from 'prop-types';

function DateView(props) {
  return <span>{new Date(props.date).toLocaleDateString()}</span>;
}

DateView.propTypes = {
  date: PropTypes.number.isRequired,
};

export default DateView;
