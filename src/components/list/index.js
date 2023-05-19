import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import CartItem from '../cart-item';

function List({list, render}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {render(item)}
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
