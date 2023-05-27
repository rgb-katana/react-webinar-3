import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemPageComponent from '../../components/item-page';
import {useCallback} from 'react';

function ItemPage() {
  const {id} = useParams();

  console.log(id);
  const store = useStore();

  useEffect(() => {
    store.actions.item.loadItem(id);
    store.actions.modals.close();

    return () => {
      store.actions.item.clear();
    };
  }, [id]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.item.title,
    description: state.item.description,
    category: state.item.category,
    madeIn: {
      title: state.item.madeIn.title,
      code: state.item.madeIn.code,
    },
    price: state.item.price,
    edition: state.item.edition,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.title}></Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      ></BasketTool>
      <ItemPageComponent
        title={select.title}
        description={select.description}
        category={select.category}
        madeIn={select.madeIn}
        price={select.price}
        edition={select.edition}
        onAdd={callbacks.addToBasket}
        id={id}
      ></ItemPageComponent>
    </PageLayout>
  );
}

export default ItemPage;
