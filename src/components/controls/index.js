import React from 'react';
import './style.css';
import CartInfo from '../cart-info';

function Controls(props) {
  return (
    <div className="Controls">
      <CartInfo props={props}></CartInfo>
      <div className="Controls-button">
        <button onClick={() => props.onOpenCart()}>Перейти</button>
      </div>
    </div>
  );
}

export default React.memo(Controls);
