import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cartTotalSum} from '../../utils';
import List from '../list';

function CartModal({cart, onClearItem, onCloseCart}) {
  return (
    <div className="Cart-modal">
      <div className="Cart">
        <div className="Cart-head">
          <h2>Корзина</h2>
          <button onClick={onCloseCart}>Закрыть</button>
        </div>
        <List list={cart} onClearItem={onClearItem} onCloseCart={onCloseCart} />
        {/* <CartList props={props} /> */}
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
