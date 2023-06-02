import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      currentUser: null,
    };
  }

  loginByToken = async (id, token) => {
    try {
      const result = await fetch(`/api/v1/users/${id}`, {
        headers: {
          'X-token': token,
        },
      });
      const json = await result.json();

      const {username, email, _id} = json.result;
      const {name, phone} = json.result.profile;

      this.setState({
        ...this.getState(),
        currentUser: {
          username,
          email,
          name,
          phone,
          id: _id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  login = async (login, password) => {
    try {
      const result = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await result.json();

      const {token} = json.result;
      const {username, email, _id} = json.result.user;
      const {name, phone} = json.result.user.profile;

      this.setState({
        ...this.getState(),
        currentUser: {
          username,
          email,
          name,
          phone,
          id: _id,
        },
      });

      localStorage.setItem('token', token);
      localStorage.setItem('id', _id);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default UserState;
