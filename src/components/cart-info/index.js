import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cartTotalSum} from '../../utils';

import {plural} from '../../utils';

const cartContent = (cart) => {
  if (cart.length > 0) {
    return `${cart.length} ${plural(cart.length, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    })} / ${cartTotalSum(cart)} ₽`;
  } else {
    return 'пусто';
  }
};

const CartInfo = ({props}) => {
  return (
    <div className="Cart-info">
      В корзине: <span className="bold">{cartContent(props.cart)}</span>
    </div>
  );
};

export default React.memo(CartInfo);
