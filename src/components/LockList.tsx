import { Lock } from '../services/maex';
import LockListItem from './LockListItem';

interface Props {
  locks: Lock[];
  onOpen: (lockId: string) => void;
}

function LockList({ locks, onOpen }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {locks.map(lock => (
        <LockListItem
          key={lock.id}
          lock={lock}
          onOpen={() => onOpen(lock.id)}
        />
      ))}
    </ul>
  );
}

export default LockList;
