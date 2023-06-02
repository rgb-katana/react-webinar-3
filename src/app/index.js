import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  if (token) {
    store.actions.user.loginByToken(id, token);
  }

  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Auth />} />
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
