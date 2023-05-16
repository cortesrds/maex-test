import { AuthenticatedTemplate } from '@azure/msal-react';
import { FaBars } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';

function NavBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex h-16 w-full items-center bg-brand p-3 text-white">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            type="button"
            className="mr-3 inline-flex items-center rounded-lg px-2 text-white focus:outline-none sm:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="h-6 w-6" />
          </button>
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            MAEX
          </span>
        </div>
        <AuthenticatedTemplate>
          <ProfileMenu />
        </AuthenticatedTemplate>
      </div>
    </nav>
  );
}

export default NavBar;
