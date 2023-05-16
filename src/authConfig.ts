import { Configuration, LogLevel } from '@azure/msal-browser';
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const firefox = ua.indexOf('Firefox');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

const tenantName = import.meta.env.VITE_MSAL_TENANT_NAME;

export const b2cPolicies = {
  names: {
    signIn: 'B2C_1_SignIn',
  },
  authorities: {
    signIn: {
      authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_SignIn`,
    },
  },
  authorityDomain: `${tenantName}.b2clogin.com`,
};

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: b2cPolicies.authorities.signIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
// export const loginRequest = {
//   scopes: ['User.Read'],
// };

// // Add here the endpoints for MS Graph API services you would like to use.
// export const graphConfig = {
//     graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
// };
