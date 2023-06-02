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
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import AuthPage from '../../components/auth-page';

function Auth() {
  const store = useStore();

  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    currentUser: state.user.currentUser,
  }));

  const callbacks = {
    onSubmit: store.actions.user.login,
    // onSuccessAuth: useEffect(() => {
    //   navigate(`/profile/${select.currentUser?.id}`);
    // }, [select.currentUser?.id]),
  };

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader
          link={`/profile/${select.currentUser.id}`}
          name={select.currentUser.name}
        />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthPage
        onSubmit={callbacks.onSubmit}
        // onSuccessAuth={callbacks.onSuccessAuth}
      />
    </PageLayout>
  );
}

export default memo(Auth);
