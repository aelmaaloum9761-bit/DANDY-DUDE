import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

/**
 * A reusable loading spinner component.
 * Can be used as a full-page overlay or an inline element.
 *
 * @param {object} props - The component props.
 * @param {boolean} [props.overlay=false] - If true, displays as a full-page overlay.
 * @param {string} [props.size='medium'] - The size of the spinner ('small', 'medium', 'large').
 * @param {string} [props.text='Loading...'] - Optional text to display below the spinner.
 */
const LoadingSpinner = ({ overlay = false, size = 'medium', text = 'Loading...' }) => {
  const spinnerClasses = `loading-spinner ${overlay ? 'loading-spinner--overlay' : ''}`;
  const spinnerElementClasses = `spinner spinner--${size}`;

  return (
    <div className={spinnerClasses} role="status" aria-live="polite">
      <div className={spinnerElementClasses}></div>
      {text && <p className="loading-text">{text}</p>}
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{text}</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  overlay: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
};

export default LoadingSpinner;