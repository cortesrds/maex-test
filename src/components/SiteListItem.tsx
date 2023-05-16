import {
  FaCalendar,
  FaMoneyBill,
  FaQuestionCircle,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Site } from '../services/maex';

interface Props {
  site: Site;
}

function SiteListItem({ site }: Props) {

  return (
    <li>
      <Link
        to={`site/${site.id}`}
        className="flex items-center justify-between rounded-lg bg-slate-200 p-3 text-slate-800 shadow hover:bg-slate-100"
      >
        <div>
          <div className="font-semibold">{site.name}</div>
          <div className="text-sm">{`${site.streetAddress}, ${site.postalCode} ${site.city}`}</div>
        </div>
        <div className="flex gap-3">
          {site.modules.map(module => {
            switch (module) {
              case 'booking':
                return <FaShoppingCart key={module} className="h-6 w-6" />;
              case 'appointment':
                return <FaCalendar key={module} className="h-6 w-6" />;
              case 'payment':
                return <FaMoneyBill key={module} className="h-6 w-6" />;
              default:
                return <FaQuestionCircle key={module} className="h-6 w-6" />;
            }
          })}
        </div>
      </Link>
    </li>
  );
}

export default SiteListItem;
