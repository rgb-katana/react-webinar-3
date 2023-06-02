import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthHeader from '../../components/auth-header';
import useSelector from '../../hooks/use-selector';
import QuitHeader from '../../components/quit-header';

import AuthPage from '../../components/auth-page';

function Auth() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    currentUser: state.user.currentUser,
  }));

  const callbacks = {
    onSubmit: store.actions.user.login,
  };

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader link={'/profile'} />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthPage onSubmit={callbacks.onSubmit} />
    </PageLayout>
  );
}

export default memo(Auth);
