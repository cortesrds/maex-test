import { useEffect, useState } from 'react';
import { OpeningHoursEntry } from '../services/maex';
import {
  capitalize,
  minutesToTimeString,
  timeStringToMinutes,
  timeStringValid,
} from '../util/helpers';
import Popup from './Popup';

interface Props {
  data?: OpeningHoursEntry;
  weekday: string;
  onSubmit: (data: OpeningHoursEntry) => void;
  onCancel: () => void;
  onDelete: () => void;
  canDelete?: boolean;
}

function OpeningHourForm({
  data,
  weekday,
  onSubmit,
  onCancel,
  onDelete,
  canDelete = false,
}: Props) {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [chained, setChained] = useState(false);

  const [startInvalid, setStartInvalid] = useState(false);
  const [endInvalid, setEndInvalid] = useState(false);
  const [typeInvalid, setTypeInvalid] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    setStart(minutesToTimeString(data.startMinutes));
    setEnd(minutesToTimeString(data.endMinutes));
    setType(data.openingType);
    setChained(data.chained);
  }, [data]);

  const handleSubmit = () => {
    let valid = true;

    if (!timeStringValid(start)) {
      setStartInvalid(true);
      valid = false;
    }

    if (!timeStringValid(end)) {
      setEndInvalid(true);
      valid = false;
    }

    if (type !== 'regular' && type !== 'extended') {
      setTypeInvalid(true);
      valid = false;
    }

    const startMinutes = timeStringToMinutes(start);
    const endMinutes = timeStringToMinutes(end);

    if (endMinutes <= startMinutes) {
      setStartInvalid(true);
      setEndInvalid(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const updatedEntry = {
      openingType: type as 'regular' | 'extended',
      weekday: weekday as
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday',
      startMinutes,
      endMinutes,
      chained,
    };

    onSubmit(updatedEntry);
  };
  // <div className="fixed inset-0 z-30 pt-16">
  //   <div className="absolute inset-0 z-40 bg-slate-800 opacity-50" />
  //   <div className="absolute inset-0 z-50 pt-16">
  //     <div className="container mx-auto my-auto w-full max-w-md rounded-b-lg bg-white p-4 shadow-lg md:w-auto md:p-8">
  //       <h2 className="text-lg font-semibold text-brand">
  //         Opening Hours on {capitalize(weekday)}
  //       </h2>
  //       <hr className="mb-4 mt-2 h-0.5 w-1/3 border-0 bg-brand" />

  return (
    <Popup title={`Opening Hours on ${capitalize(weekday)}`}>
      <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label
            htmlFor="start"
            className={`text-md block font-medium ${
              startInvalid ? 'text-brand' : 'text-slate-800'
            }`}
          >
            Start
          </label>
          <input
            id="start"
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="hh:mm"
            value={start}
            onChange={e => {
              setStartInvalid(false);
              setStart(e.target.value);
            }}
          />
        </div>

        <div>
          <label
            htmlFor="end"
            className={`text-md block font-medium ${
              endInvalid ? 'text-brand' : 'text-slate-800'
            }`}
          >
            End
          </label>
          <input
            id="end"
            type="text"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="hh:mm"
            value={end}
            onChange={e => {
              setEndInvalid(false);
              setEnd(e.target.value);
            }}
          />
        </div>

        <div>
          <div
            className={`text-md mb-2 font-medium ${
              typeInvalid ? 'text-brand' : 'text-slate-800'
            }`}
          >
            Opening Type
          </div>
          <div className="flex-col">
            <div className="flex items-center">
              <input
                id="regular"
                type="radio"
                className="h-4 w-4 border-slate-300 bg-slate-100 text-brand focus:ring-2 focus:ring-brand"
                checked={type === 'regular'}
                onChange={() => {
                  setType('regular');
                }}
              />
              <label
                htmlFor="regular"
                className="text-md ml-2 font-medium text-slate-800"
              >
                Regular
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="extended"
                type="radio"
                className="h-4 w-4 border-slate-300 bg-slate-100 text-brand focus:ring-2 focus:ring-brand"
                checked={type === 'extended'}
                onChange={() => {
                  setType('extended');
                }}
              />
              <label
                htmlFor="extended"
                className="text-md ml-2 font-medium text-slate-800"
              >
                Extended
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className={'text-md mb-2 font-medium text-slate-800'}>
            Chained
          </div>
          <div className="flex-col">
            <div className="flex items-center">
              <input
                id="chained"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 bg-slate-100 text-brand focus:ring-2 focus:ring-brand"
                checked={chained}
                onChange={() => {
                  setChained(!chained);
                }}
              />
              <label
                htmlFor="chained"
                className="text-md ml-2 font-medium text-slate-800"
              >
                Continues previous opening hours entry
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            className="text-md rounded-lg border-2 border-brand px-4 py-3 font-bold tracking-wide text-brand transition hover:bg-brand-light hover:text-white active:bg-brand-dark active:text-white"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          {canDelete && (
            <button
              type="button"
              className="text-md rounded-lg border-2 border-brand px-4 py-3 font-bold tracking-wide text-brand transition hover:bg-brand-light hover:text-white active:bg-brand-dark active:text-white"
              onClick={() => onDelete()}
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="text-md rounded-lg border-2 border-brand bg-brand px-4 py-3 font-bold tracking-wide text-white transition hover:bg-brand-light active:bg-brand-dark"
          >
            Save
          </button>
        </div>
      </form>
    </Popup>
  );
}

//     </div>
//   </div>
// </div>

export default OpeningHourForm;
