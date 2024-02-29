import localStorage from 'src/utils/localStorage';

export async function getCurrentUser() {
  // @todo: can fetch via API call
  return localStorage.get('__hydra');
}
