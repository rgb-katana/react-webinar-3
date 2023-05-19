import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from '../cart-item';

const renderList = (item, onAddToCart, onClearItem) => {
  if (item.quantity) {
    return <CartItem item={item} onClearItem={onClearItem} />;
  }
  return <Item item={item} onAddToCart={onAddToCart} />;
};

function List({list, onAddToCart, onClearItem}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {renderList(item, onAddToCart, onClearItem)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onClearItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

export default React.memo(List);
