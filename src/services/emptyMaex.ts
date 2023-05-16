import { AuthError } from '@azure/msal-browser';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { msalInstance } from '../main';

async function buildAuthHeader(): Promise<string> {
  console.log('BUILD AUTH HEADER');

  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    );
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      scopes: [],
      account: account,
    });

    const idToken = response.idToken;

    return `Bearer ${idToken}`;
  } catch (err) {
    const error = err as AuthError;

    if (error.errorMessage.includes('AADB2C90077')) {
      await msalInstance.acquireTokenRedirect({
        scopes: [],
        account: account,
      });
    }
  }

  throw new Error('Unable to acquire token');
}

function buildMaexUserHeader(): string {
  console.log('BUILD MAEX USER HEADER');

  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    );
  }

  return account.localAccountId;
}

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: await buildAuthHeader(),
      ...(import.meta.env.VITE_FAKE_USER_HEADER
        ? { 'x-maex-user': buildMaexUserHeader() }
        : {}),
    },
  })(args, api, extraOptions);
};

export const emptyMaexApi = createApi({
  reducerPath: 'maexApi',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
