import 'react';
import { ReactElement } from 'react';

interface Props {
  children?: ReactElement[] | ReactElement;
}

function Main({ children = [] }: Props) {
  return <main className="max-w-7xl sm:ml-64">{children}</main>;
}

export default Main;
