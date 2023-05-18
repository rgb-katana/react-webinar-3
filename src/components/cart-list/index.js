import React from 'react';
import './style.css';
import CartItem from '../cart-item';

function CartList({props}) {
  return (
    <div className="Cart-list">
      {props.cart.map((item) => (
        <CartItem key={item.code} item={item} onClearItem={props.onClearItem} />
      ))}
    </div>
  );
}

export default React.memo(CartList);
