import { ReactElement } from 'react';

interface Props {
  title: string;
  children?: ReactElement | ReactElement[];
}

function Popup({ title, children = [] }: Props) {
  return (
    <div className="fixed inset-0 z-30 pt-16">
      <div className="absolute inset-0 z-40 bg-slate-800 opacity-50" />
      <div className="absolute inset-0 z-50 pt-16">
        <div className="container mx-auto my-auto w-full max-w-md rounded-b-lg bg-white p-4 shadow-lg md:w-auto md:p-8">
          <h2 className="text-lg font-semibold text-brand">{title}</h2>
          <hr className="mb-4 mt-2 h-0.5 w-1/3 border-0 bg-brand" />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
