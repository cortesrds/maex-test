import { FaEdit, FaLink, FaPlus } from 'react-icons/fa';
import { OpeningHoursEntry } from '../services/maex';
import { capitalize, minutesToTimeString } from '../util/helpers';

interface Props {
  weekday: string;
  entries: OpeningHoursEntry[];
  onAdd: () => void;
  onEdit: (index: number) => void;
}

function isOverlapping(entries: OpeningHoursEntry[], index: number): boolean {
  // check all entries starting before this one
  for (let i = 0; i < index; ++i) {
    if (entries[i].endMinutes > entries[index].startMinutes) {
      return true;
    }
  }

  // as entries are ordered by startMinutes, we only need to check the next entry
  if (
    index < entries.length - 1 &&
    entries[index].endMinutes > entries[index + 1].startMinutes
  ) {
    return true;
  }

  return false;
}

function OpeningHoursDay({ weekday, entries, onAdd, onEdit }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-lg p-2 odd:bg-slate-100 even:bg-white">
      <h6 className="p-2 font-semibold">{capitalize(weekday)}</h6>
      {entries.map((o, idx) => (
        <div key={idx}>
          {o.chained && (
            <div className="-mt-2 flex items-center justify-center p-2">
              <FaLink className="h-4 w-4 text-slate-500" />
            </div>
          )}
          <div
            className={`group flex justify-between rounded-lg p-2 ${
              o.openingType === 'extended' ? 'bg-slate-200' : 'bg-slate-300'
            } ${isOverlapping(entries, idx) ? 'border-2 border-red-500' : ''}`}
          >
            <div>
              {minutesToTimeString(o.startMinutes)}–
              {minutesToTimeString(o.endMinutes)}
            </div>
            <FaEdit
              className="invisible h-6 w-6 cursor-pointer text-brand group-hover:visible"
              onClick={() => onEdit(idx)}
            />
          </div>
        </div>
      ))}
      <div
        className="group mt-2 flex cursor-pointer items-center justify-center rounded-lg border-2 border-brand p-2 hover:bg-brand"
        onClick={() => onAdd()}
      >
        <FaPlus className="h-6 w-6 text-brand group-hover:text-white" />
      </div>
    </div>
  );
}

export default OpeningHoursDay;
