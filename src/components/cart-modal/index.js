import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cartTotalSum} from '../../utils';
import List from '../list';
import CartItem from '../cart-item';

function CartModal({cart, onClearItem, onCloseCart}) {
  const render = (item) => {
    return <CartItem onClearItem={onClearItem} item={item} />;
  };

  return (
    <div className="Cart-modal">
      <div className="Cart">
        <div className="Cart-head">
          <h2>Корзина</h2>
          <button onClick={onCloseCart}>Закрыть</button>
        </div>
        <List list={cart} render={render} />
        <div className="Cart-total">
          <div className="Cart-total-title">
            <span className="bold">Итого</span>
          </div>
          <div className="Cart-total-sum">
            <span className="bold">{`${cartTotalSum(cart)}₽`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CartModal);
