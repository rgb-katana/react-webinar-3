import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CartList from '../cart-list';
import { cartTotalSum } from '../../utils';

function Cart({ props }) {
  // const [cart, setCart] = useState(props.cart);

  return (
    <div className="Cart">
      <div className="Cart-head">
        <h2>Корзина</h2>
        <button onClick={props.onCloseCart}>Закрыть</button>
      </div>
      <CartList props={props} />
      <div className="Cart-total">
        <div className="Cart-total-title">
          <span className="bold">Итого</span>
        </div>
        <div className="Cart-total-sum">
          <span className="bold">{`${cartTotalSum(props.cart)}₽`}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cart);
