import React from 'react';
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

function Controls({cart, onOpenCart}) {
  return (
    <div className="Controls">
      <div className="Cart-info">
        В корзине: <span className="bold">{cartContent(cart)}</span>
      </div>
      <div className="Controls-button">
        <button onClick={() => onOpenCart()}>Перейти</button>
      </div>
    </div>
  );
}

export default React.memo(Controls);
