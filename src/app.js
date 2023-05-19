import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const isCartOpen = store.getState().isCartOpen;

  const callbacks = {
    // Здесь изменяю логику удаления на добавление в корзину
    onAddToCart: useCallback(
      (item) => {
        store.addItemToCart(item);
      },
      [store]
    ),

    // Здесь открытие модального кона
    onOpenCart: useCallback(() => {
      store.setCartOpen();
    }, [store]),

    // Удаление item из корзины
    onClearItem: useCallback(
      (item) => {
        store.clearItemFromCart(item);
      },
      [store]
    ),

    // Закрытие модального окна
    onCloseCart: useCallback(() => {
      store.setCartClose();
    }, [store]),
  };

  const render = (item) => {
    return <Item item={item} onAddToCart={callbacks.onAddToCart} />;
  };

  return (
    <>
      {isCartOpen ? (
        <CartModal
          cart={cart}
          onClearItem={callbacks.onClearItem}
          onCloseCart={callbacks.onCloseCart}
        />
      ) : (
        ''
      )}
      <PageLayout>
        <Head title="Магазин" />
        <Controls cart={cart} onOpenCart={callbacks.onOpenCart} />
        {/* <List list={list} onAddToCart={callbacks.onAddToCart} /> */}
        <List list={list} render={render} />
      </PageLayout>
    </>
  );
}

export default App;
