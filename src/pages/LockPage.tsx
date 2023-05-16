import 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import LockList from '../components/LockList';
import Popup from '../components/Popup';
import {
  useGetLocksForSiteQuery,
  useGetSiteQuery,
  useOpenLockMutation,
} from '../services/maex';

function LockPage() {
  const { siteId } = useParams();

  if (!siteId) {
    return null;
  }

  const { data: site, isLoading: isSiteLoading } = useGetSiteQuery({ siteId });

  const [selectedLock, setSelectedLock] = useState<string>();

  const { data, error, isLoading } = useGetLocksForSiteQuery({ siteId });

  const [openLock, { isSuccess }] = useOpenLockMutation();

  useEffect(() => {
    if (isSuccess) {
      setSelectedLock(undefined);
    }
  }, [isSuccess]);

  if (isLoading || !data || isSiteLoading || !site) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h2 className="pb-3 text-2xl font-semibold tracking-wide text-brand">
        Locks
      </h2>
      <LockList locks={data} onOpen={lockId => setSelectedLock(lockId)} />
      {selectedLock && (
        <Popup title="Open lock">
          <div>
            Are you sure you want to open lock <strong>{selectedLock}</strong>{' '}
            at <strong>{site.name}</strong>?
          </div>
          <div className="flex justify-between pt-6">
            <button
              type="button"
              className="text-md rounded-lg border-2 border-brand px-4 py-3 font-bold tracking-wide text-brand transition hover:bg-brand-light hover:text-white active:bg-brand-dark active:text-white"
              onClick={() => setSelectedLock(undefined)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-md rounded-lg border-2 border-brand bg-brand px-4 py-3 font-bold tracking-wide text-white transition hover:bg-brand-light active:bg-brand-dark"
              onClick={() => openLock({ lockId: selectedLock })}
            >
              Open
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default LockPage;
