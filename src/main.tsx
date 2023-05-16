import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NavBar from './components/NavBar';
import './index.css';
import SitePage from './pages/SitePage';

import { store } from './store';

// MSAL imports
import {
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { CustomNavigationClient } from './CustomNavigationClien';
import AdditionalFieldPage from './pages/AdditionalFieldPage';
import LockPage from './pages/LockPage';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import ModulePage from './pages/ModulePage';
import NotificationPage from './pages/NotificationPage';
import OpeningHourPage from './pages/OpeningHourPage';
import RegionPage from './pages/RegionPage';
import WasteItemPage from './pages/WasteItemPage';
import { maexApi } from './services/maex';

export const msalInstance = new PublicClientApplication(msalConfig);

console.log('MAIN');

// Default to using the first account if no account is active on page load
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback(event => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    (event.payload as AuthenticationResult).account
  ) {
    const account = (event.payload as AuthenticationResult).account;
    msalInstance.setActiveAccount(account);
  }

  if (event.eventType === EventType.LOGIN_FAILURE) {
    console.log('LOGIN_FAILURE:', event.error);
  }

  if (event.eventType === EventType.LOGOUT_END) {
    store.dispatch(maexApi.util.resetApiState());
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/site/:siteId',
    element: <SitePage />,
    children: [
      {
        path: 'openingHours',
        element: <OpeningHourPage />,
      },
      {
        path: 'locks',
        element: <LockPage />,
      },
      {
        path: 'wasteItems',
        element: <WasteItemPage />,
      },
      {
        path: 'modules',
        element: <ModulePage />,
      },
      {
        path: 'regions',
        element: <RegionPage />,
      },
      {
        path: 'notifications',
        element: <NotificationPage />,
      },
      {
        path: 'additionalFields',
        element: <AdditionalFieldPage />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);

const navigationClient = new CustomNavigationClient(router.navigate);
msalInstance.setNavigationClient(navigationClient);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <NavBar />
        <div className="pt-16">
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <RouterProvider router={router} />
          </AuthenticatedTemplate>
        </div>
      </Provider>
    </MsalProvider>
  </React.StrictMode>
);
