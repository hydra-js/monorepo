// @todo: move these logic to Context API

export function getAuth() {
  const __hydra = window.localStorage.getItem('__hydra');
  return __hydra ? JSON.parse(__hydra) : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setAuth(user: any) {
  window.localStorage.setItem('__hydra', JSON.stringify({ user }));
}
