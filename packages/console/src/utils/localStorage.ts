const localStorage = window.localStorage;

export default {
  set: (key: string, value: unknown) =>
    localStorage.setItem(key, JSON.stringify(value)),

  get: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  unset: (key: string) => localStorage.removeItem(key),

  clear: () => localStorage.clear(),
};
