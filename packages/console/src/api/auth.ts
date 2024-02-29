import localStorage from 'src/utils/localStorage';

const user = {
  id: 'id',
  token: 'token',
  name: { screen_name: 'John Doe' },
  email: 'john@examle.com',
  role: 9,
  status: 0,
};

export async function login() {
  // @todo: call the login API,
  // return the user object if successful
  return localStorage.set('__hydra', user);
}

export async function logout() {
  // @todo: call the logout API
  localStorage.unset('__hydra');
  return {};
}

export async function register() {
  // @todo: register
  return {};
}
