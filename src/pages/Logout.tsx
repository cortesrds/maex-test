import { BrowserUtils } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';

export function Logout() {
  const { instance } = useMsal();

  useEffect(() => {
    instance.logoutRedirect({
      account: instance.getActiveAccount(),
      onRedirectNavigate: () => !BrowserUtils.isInIframe(),
    });
  }, [instance]);

  return <div>Logout</div>;
}
