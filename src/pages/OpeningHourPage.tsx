import deepEqual from 'deep-equal';
import 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import OpeningHourForm from '../components/OpeningHourForm';
import OpeningHoursDay from '../components/OpeningHoursDay';
import {
  OpeningHoursEntry,
  useGetOpeningHoursEntriesForSiteQuery,
  useSetOpeningHoursEntriesForSiteMutation,
} from '../services/maex';
import { weekdays } from '../util/helpers';

interface OpeningHours {
  monday: OpeningHoursEntry[];
  tuesday: OpeningHoursEntry[];
  wednesday: OpeningHoursEntry[];
  thursday: OpeningHoursEntry[];
  friday: OpeningHoursEntry[];
  saturday: OpeningHoursEntry[];
  sunday: OpeningHoursEntry[];

  [weekday: string]: OpeningHoursEntry[];
}

function sortByStartMinutes(entries: OpeningHoursEntry[]): OpeningHoursEntry[] {
  return entries.sort((a, b) => a.startMinutes - b.startMinutes);
}

function parseData(data: OpeningHoursEntry[]): OpeningHours {
  const openingHours: OpeningHours = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  data.forEach(entry => {
    openingHours[entry.weekday].push(entry);
  });

  weekdays.forEach(
    day => (openingHours[day] = sortByStartMinutes(openingHours[day]))
  );

  return openingHours;
}

function openingHoursAreValid(openingHours: OpeningHours): boolean {
  return weekdays.every(day => {
    const entries = openingHours[day];

    if (entries.length === 0) {
      return true;
    }

    return entries.every((entry, index) => {
      if (index === 0) {
        return true;
      }

      const previousEntry = entries[index - 1];

      if (entry.startMinutes < previousEntry.endMinutes) {
        return false;
      }

      return true;
    });
  });
}

function OpeningHourPage() {
  const { siteId } = useParams();

  if (!siteId) {
    return null;
  }

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const { data, error, isLoading } = useGetOpeningHoursEntriesForSiteQuery({
    siteId,
  });

  const [setOpeningHoursEntriesForSite, { isLoading: isUpdating, isSuccess }] =
    useSetOpeningHoursEntriesForSiteMutation();

  useEffect(() => {
    if (!data) {
      return;
    }

    setOpeningHours(parseData(data));
  }, [data]);

  const [formVisible, setFormVisible] = useState(false);

  const [weekday, setWeekday] = useState<string>('');
  const [entryIndex, setEntryIndex] = useState<number | undefined>();
  const [formData, setFormData] = useState<OpeningHoursEntry | undefined>();

  const submitOpeningHoursEntry = (data: OpeningHoursEntry) => {
    setFormVisible(false);

    if (entryIndex === undefined) {
      setOpeningHours({
        ...openingHours,
        [weekday]: sortByStartMinutes([...openingHours[weekday], data]),
      });
    } else {
      const newEntries = [...openingHours[weekday]];
      newEntries.splice(entryIndex, 1, data);

      setOpeningHours({
        ...openingHours,
        [weekday]: sortByStartMinutes(newEntries),
      });
    }
  };

  const deleteOpeningHoursEntry = () => {
    setFormVisible(false);

    if (entryIndex === undefined) {
      return;
    }

    const newEntries = [...openingHours[weekday]];
    newEntries.splice(entryIndex, 1);

    setOpeningHours({
      ...openingHours,
      [weekday]: newEntries,
    });
  };

  const onAdd = (weekday: string) => {
    setWeekday(weekday);
    setEntryIndex(undefined);
    setFormData(undefined);
    setFormVisible(true);
  };

  const onEdit = (weekday: string, index: number) => {
    setWeekday(weekday);
    setEntryIndex(index);
    setFormData(openingHours[weekday][index]);
    setFormVisible(true);
  };

  const handleSave = () => {
    const openingHourEntries: OpeningHoursEntry[] = [];
    weekdays.forEach(day => openingHourEntries.push(...openingHours[day]));

    setOpeningHoursEntriesForSite({ siteId: siteId, body: openingHourEntries });
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  const changed = !deepEqual(openingHours, parseData(data));

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="pb-3 text-2xl font-semibold tracking-wide text-brand">
            Opening Hours
          </h2>
          <div className="flex gap-2 pb-2">
            {isUpdating && <div>Saving…</div>}
            <button
              type="button"
              className="text-md rounded-lg border-2 border-brand bg-white px-4 py-2 font-bold tracking-wide text-brand transition hover:bg-brand-light hover:text-white active:bg-brand-dark active:text-white disabled:border-slate-400 disabled:bg-white disabled:text-slate-400"
              onClick={() => setOpeningHours(parseData(data))}
              disabled={!changed || isUpdating}
            >
              Restore
            </button>
            <button
              type="button"
              className="text-md rounded-lg border-2 border-brand bg-brand px-4 py-2 font-bold tracking-wide text-white transition hover:bg-brand-light active:bg-brand-dark disabled:border-slate-400 disabled:bg-slate-400"
              onClick={() => handleSave()}
              disabled={
                !changed || isUpdating || !openingHoursAreValid(openingHours)
              }
            >
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-2">
          {weekdays.map(weekday => (
            <OpeningHoursDay
              key={weekday}
              weekday={weekday}
              entries={openingHours[weekday]}
              onAdd={() => onAdd(weekday)}
              onEdit={index => onEdit(weekday, index)}
            />
          ))}
        </div>
      </div>
      {formVisible && (
        <OpeningHourForm
          data={formData}
          weekday={weekday}
          onSubmit={data => submitOpeningHoursEntry(data)}
          onCancel={() => setFormVisible(false)}
          onDelete={() => deleteOpeningHoursEntry()}
          canDelete={entryIndex !== undefined}
        />
      )}
    </>
  );
}

export default OpeningHourPage;
