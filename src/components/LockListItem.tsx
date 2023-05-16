import { FaLockOpen } from 'react-icons/fa';
import { Lock } from '../services/maex';

interface Props {
  lock: Lock;
  onOpen: () => void;
}

function LockListItem({ lock, onOpen }: Props) {
  return (
    <li className="flex items-center justify-between rounded-lg bg-slate-200 p-3 text-slate-800 shadow hover:bg-slate-100">
      <div>
        <div className="font-semibold">{lock.id}</div>
        <div className="text-sm">Hardware ID: {lock.hardwareId}</div>
      </div>
      <div className="flex gap-3">
        <FaLockOpen
          className="h-6 w-6 cursor-pointer"
          onClick={() => onOpen()}
        />
      </div>
    </li>
  );
}

export default LockListItem;
