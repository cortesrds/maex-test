import { useMsal } from '@azure/msal-react';
import { redirect } from 'react-router-dom';

export function Login() {
  const { instance, accounts, inProgress } = useMsal();

  if (accounts.length > 0) {
    redirect('/');
    return null;
  } else if (inProgress === 'login') {
    return <div className="p-4">Login is currently in progress!</div>;
  } else {
    return (
      <div className="p-4">
        <div>There are currently no users signed in!</div>
        <button
          className="mt-4 rounded-lg bg-brand p-2 px-3 font-semibold tracking-wide text-white hover:bg-brand-light active:bg-brand-dark"
          onClick={() => instance.loginRedirect()}
        >
          Login
        </button>
      </div>
    );
  }
}
