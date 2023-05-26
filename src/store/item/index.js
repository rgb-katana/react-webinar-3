import StoreModule from '../module';

class Item extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      title: '',
      description: '',
      category: '',
      madeIn: {
        title: '',
        code: '',
      },
      price: 0,
      edition: 0,
    };
  }

  clear() {
    this.setState({...this.getState(), ...this.initState()});
  }

  async loadItem(id) {
    const response = await fetch(
      `api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        title: json.result.title,
        description: json.result.description,
        category: json.result.category.title,
        madeIn: {
          title: json.result.madeIn.title,
          code: json.result.madeIn.code,
        },
        price: json.result.price,
        edition: json.result.edition,
      },
      'Загружена страница товара из АПИ'
    );
  }
}

export default Item;
