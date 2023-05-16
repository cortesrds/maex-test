import Loading from './components/Loading';
import SiteList from './components/SiteList';
import { useGetSitesQuery } from './services/maex';

function App() {
  const { data, error, isLoading } = useGetSitesQuery();

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl p-4">
      <SiteList sites={data} />
    </div>
  );
}

export default App;
