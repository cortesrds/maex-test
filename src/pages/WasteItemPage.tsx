import 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import WasteItemList from '../components/WasteItemList';
import { useGetWasteItemsForSiteQuery } from '../services/maex';

function WasteItemPage() {
  const { siteId } = useParams();

  if (!siteId) {
    return null;
  }

  const { data, error, isLoading } = useGetWasteItemsForSiteQuery({ siteId });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h2 className="pb-3 text-2xl font-semibold tracking-wide text-brand">
        Waste Items
      </h2>
      <WasteItemList wasteItems={data} />
    </div>
  );
}

export default WasteItemPage;
