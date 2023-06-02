import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useState} from 'react';
import './style.css';

const defaultFormFields = {
  login: 'test_1',
  password: '123456',
};

function AuthPage(props) {
  const cn = bem('AuthPage');

  const [formFields, setFormFields] = useState(defaultFormFields);
  const {login, password} = formFields;

  const setFormToEmpty = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      props.onSubmit(login, password);
      setFormToEmpty();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  };

  return (
    <div className={cn()}>
      <h2 className={cn('bold')}>Вход</h2>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <div className={cn('group')}>
          <label className={cn('label')} htmlFor="login">
            Логин
          </label>
          <input
            className={cn('input')}
            type="text"
            onChange={handleInput}
            required
            name="login"
            id="login"
            value={login}
          />
        </div>
        <div className={cn('group')}>
          <label className={cn('label')} htmlFor="password">
            Пароль
          </label>
          <input
            className={cn('input')}
            type="password"
            onChange={handleInput}
            required
            name="password"
            id="password"
            value={password}
          />
        </div>
        {/* Оставить место для ошибки от сервера */}
        <div className={cn('button')}>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default memo(AuthPage);
