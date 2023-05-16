import { Site } from '../services/maex';
import SiteListItem from './SiteListItem';

interface Props {
  sites: Site[];
}

function SiteList({ sites }: Props) {

  return (
    <>
      <h2 className="pb-3 text-2xl font-semibold tracking-wide text-brand">
        Sites
      </h2>
      <ul className="flex flex-col gap-3">
        {sites.map(site => (

          <SiteListItem
            site={site}
            key={site.id}
          />
        ))}
      </ul>
    </>
  );
}

export default SiteList;
