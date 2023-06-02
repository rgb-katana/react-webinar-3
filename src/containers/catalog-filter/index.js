import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import {useState, useEffect} from 'react';

function CatalogFilter() {
  const store = useStore();

  const [categories, setCategories] = useState([]);

  const makeSubcategories = (categoryArray) => {
    const result = [];
    for (const category1 of categoryArray) {
      category1.subscategories = [];
      if (category1.parent === null) result.push(category1);
      else {
        for (const category2 of categoryArray) {
          if (category1.parent._id === category2._id) {
            category2.subscategories.push(category1);
            result.push(category2);
            break;
          }
        }
      }
    }

    const resultObject = {};
    const finalResult = [];
    for (const element of result) {
      if (element.parent === null && !resultObject[element.title]) {
        resultObject[element.title] = element;
        finalResult.push(element);
      }
    }
    return finalResult;
  };

  const createInterface = (array, res = [], levelOfDepth = 0) => {
    if (!array.length) return res;

    res.push({
      title: `${'- '.repeat(levelOfDepth)}${array[0].title}`,
      value: array[0]._id,
    });

    if (array[0].subscategories) {
      createInterface(array[0].subscategories, res, levelOfDepth + 1);
    }
    return createInterface(array.slice(1), res, levelOfDepth);
  };

  const getCategories = async () => {
    const result = await fetch(
      '/api/v1/categories?fields=_id,title,parent(_id)&limit=1000'
    );
    const json = await result.json();
    return createInterface(makeSubcategories(json.result.items));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Смена категории
    onCategory: useCallback((category) => {
      store.actions.catalog.setParams({category, page: 1});
    }),
    // Сортировка
    onSort: useCallback(
      (sort) => store.actions.catalog.setParams({sort}),
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => store.actions.catalog.setParams({query, page: 1}),
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        {value: 'order', title: 'По порядку'},
        {value: 'title.ru', title: 'По именованию'},
        {value: '-price', title: 'Сначала дорогие'},
        {value: 'edition', title: 'Древние'},
      ],
      []
    ),
    category: useMemo(
      () => [{value: 'all', title: 'Все'}, ...categories],
      [categories]
    ),
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.category}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
