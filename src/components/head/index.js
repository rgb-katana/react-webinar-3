import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({title}) {
  console.log(title);
  return (
    <div className="Head">
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
