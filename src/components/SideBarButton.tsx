import 'react';
import { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';

interface IconProps {
  className: string;
}

interface Props {
  to: string;
  onClick?: () => void;
  Icon?: ComponentType<IconProps>;
  text: string;
  badgeText?: string;
}

function SideBarButton({
  to,
  onClick = () => {},
  Icon,
  text,
  badgeText,
}: Props) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `group mx-3 flex cursor-pointer select-none items-center rounded-lg p-2 font-medium hover:bg-brand hover:text-white ${
            isActive ? 'font-semibold text-brand' : 'text-slate-800'
          }
          `
        }
        onClick={() => onClick()}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <span className={`flex-1 ${Icon ? 'ml-3' : ''}`}>{text}</span>
        {badgeText && (
          <span className="ml-3 inline-flex items-center justify-center rounded-full bg-brand px-2 py-1 text-sm font-medium text-white group-hover:bg-white group-hover:text-brand">
            {badgeText}
          </span>
        )}
      </NavLink>
    </li>
  );
}

export default SideBarButton;
