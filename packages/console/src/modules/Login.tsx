import { FormEvent } from 'react';
import { redirect } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';

export default function LoginModule() {
  const { login, loading, error } = useAuth();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    login(formData.get('email') as string, formData.get('password') as string);

    redirect('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>
          Email
          <input name='email' type='email' />
        </label>
      </div>
      <div>
        <label>
          Password
          <input name='password' type='password' />
        </label>
      </div>

      <div>
        <button disabled={loading}>Login</button>
      </div>

      {error && <p>Bad login/password</p>}
    </form>
  );
}
