import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import nextIcon from '../icons/right-arrow.png';

export default function ButtonNext({ nextPage }) {
  return (
    <div>
      <Link aria-label="next-page-button" to={`/${nextPage}`}>
        <img
          src={nextIcon}
          alt="next page button"
        />
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
