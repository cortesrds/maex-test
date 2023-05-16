import 'react';
import { ReactElement } from 'react';

interface Props {
  children?: ReactElement[];
}

function SideBar({ children = [] }: Props) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 -translate-x-full bg-slate-200 pt-16 transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto pb-4">
        <ul className="space-y-2">{children}</ul>
      </div>
    </aside>
  );
}

export default SideBar;
