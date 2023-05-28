import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function ItemPageComponent(props) {
  const cn = bem('PageItem');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.description}</div>
      <div className={cn('dealer')}>
        Страна производитель:&nbsp;
        <span className="bold">
          {props.madeIn.title} {props.madeIn.code}
        </span>
      </div>
      <div className={cn('category')}>
        Категория:&nbsp;
        <span className="bold">{props.category}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска:&nbsp;
        <span className="bold">{props.edition}</span>
      </div>
      <div className={cn('price')}>
        <span className="bold big">Цена:&nbsp;{props.price}</span>
      </div>
      <button className={cn('add')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ItemPageComponent.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  description: PropTypes.string,
  madeIn: PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  }),
  price: PropTypes.number,
  edition: PropTypes.string,
  category: PropTypes.string,
  onAdd: PropTypes.func,
};

ItemPageComponent.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemPageComponent);
