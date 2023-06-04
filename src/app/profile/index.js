import {memo, useCallback, useEffect, useState} from 'react';
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
import ProfilePage from '../../components/profile-page';
import {useNavigate} from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    currentUser: state.profile.currentUser,
  }));

  useEffect(() => {
    if (select.currentUser === null) navigate('/login');
  }, [select.currentUser]);

  const callbacks = {
    onSubmit: store.actions.profile.login,
    logout: useCallback(async () => {
      store.actions.profile.logout();
    }),
  };

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader
          link={`/profile/${select.currentUser?.id}`}
          name={select.currentUser?.name}
          onLogout={callbacks.logout}
        />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfilePage
        email={select.currentUser?.email}
        name={select.currentUser?.name}
        phone={select.currentUser?.phone}
      />
    </PageLayout>
  );
}

export default memo(Profile);
