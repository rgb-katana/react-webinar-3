import {generateCode} from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   */
  addItemToCart(item) {
    const existingItem = this.state.cart.find(
      (cartItem) => cartItem.code === item.code
    );

    if (!existingItem) {
      const newCart = [...this.state.cart, {...item, quantity: 1}];
      this.setState({
        ...this.state,
        cart: newCart,
      });
    } else {
      const newCart = this.state.cart.map((cartItem) => {
        if (cartItem.code === item.code) {
          cartItem.quantity++;
        }
        return cartItem;
      });
      this.setState({...this.state, cart: newCart});
    }
  }

  /**
   * Удаление товара из корзины
   */
  clearItemFromCart(item) {
    const newCart = this.state.cart.filter(
      (cartItem) => cartItem.code !== item.code
    );
    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  /**
   * Открытие корзины в модальном окне
   */
  setCartOpen() {
    this.setState({
      ...this.state,
      isCartOpen: true,
    });
  }

  setCartClose() {
    this.setState({
      ...this.state,
      isCartOpen: false,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }
}

export default Store;
