import 'react';
import { Site } from '../services/maex';

interface Props {
  site: Site;
}

function SideBarSiteInfo({ site }: Props) {
  return (
    <li className="mb-4 w-full bg-slate-300 p-3">
      <div className="font-semibold text-slate-800">{site.name}</div>
      <div className="text-sm text-slate-800">{`${site.streetAddress}, ${site.postalCode} ${site.city}`}</div>
    </li>
  );
}

export default SideBarSiteInfo;
