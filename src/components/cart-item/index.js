import React from 'react';
import './style.css';

function CartItem(props) {
  console.log(props);
  const callbacks = {
    onClearItem: (e) => {
      e.stopPropagation();
      props.onClearItem(props.item);
    },
  };

  return (
    <div className="Cart-item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} &#x20bd;</div>
      <div className="Item-quantity">{props.item.quantity} шт.</div>
      <div className="Item-actions">
        <button onClick={callbacks.onClearItem}>Удалить</button>
      </div>
    </div>
  );
}

export default React.memo(CartItem);
