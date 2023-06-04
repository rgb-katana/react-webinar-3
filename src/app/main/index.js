import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import AuthHeader from '../../components/auth-header';
import QuitHeader from '../../components/quit-header';
import {useCallback} from 'react';

import useSelector from '../../hooks/use-selector';

function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    currentUser: state.profile.currentUser,
  }));

  const callbacks = {
    // Добавление в корзину

    logout: useCallback(() => {
      store.actions.profile.logout();
    }),
  };

  // const callbacks =

  const {t} = useTranslate();

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader
          link={`/profile/${select.currentUser.id}`}
          name={select.currentUser.name}
          onLogout={callbacks.logout}
        />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
