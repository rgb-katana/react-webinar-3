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
import ProfilePage from '../../components/profile-page';
import {useParams} from 'react-router-dom';

function Profile() {
  const params = useParams();

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    currentUser: state.user.currentUser,
  }));

  console.log(select);

  const callbacks = {
    onSubmit: store.actions.user.login,
  };

  const {email, name, phone, id} = select.currentUser;

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader link={`/profile/${id}`} name={name} />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfilePage email={email} name={name} phone={phone} />
    </PageLayout>
  );
}

export default memo(Profile);
