import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Cart from '../cart';

function CartModal(props) {
  return (
    <div className="Cart-modal">
      <Cart props={props}></Cart>
    </div>
  );
}

export default React.memo(CartModal);
