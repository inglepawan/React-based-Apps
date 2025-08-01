import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, children, className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
          {title}
        </h3>
      )}
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Card.defaultProps = {
  title: '',
  className: ''
};

export default Card;
