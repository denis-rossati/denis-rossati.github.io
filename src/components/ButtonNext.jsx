import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonNext({ nextPage }) {
  return (
    <div>
      <Link to={`/${nextPage}`}>
        nextpage
      </Link>
    </div>
  );
}

ButtonNext.defaultProps = {
  nextPage: 'main',
};

ButtonNext.propTypes = {
  nextPage: PropTypes.string,
};
