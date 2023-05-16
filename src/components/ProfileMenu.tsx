import { useState } from 'react';
import { useGetProfileQuery } from '../services/maex';

function ProfileMenu() {
  const { data, error, isLoading } = useGetProfileQuery();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="ml-3 flex items-center">
        {error && <div>Error</div>}
        {isLoading && <div>Loading…</div>}
        {data && (
          <>
            <div
              className="cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {`${data.givenName} ${data.surname}`}
            </div>
            <div
              className={`fixed right-4 top-12 z-20 list-none divide-y divide-gray-100 rounded bg-slate-200 text-base shadow ${
                userMenuOpen ? '' : 'hidden'
              }`}
            >
              <div className="px-4 py-3" role="none">
                <p className="text-sm font-semibold text-brand" role="none">
                  {`${data.givenName} ${data.surname}`}
                </p>
                <p className="truncate text-sm text-slate-800" role="none">
                  {data.mail || 'no mail'}
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-brand hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileMenu;
