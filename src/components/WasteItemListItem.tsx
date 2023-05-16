import { WasteItem } from '../services/maex';

interface Props {
  wasteItem: WasteItem;
}

function WasteItemListItem({ wasteItem }: Props) {
  return (
    <li className="relative flex items-center rounded-lg bg-slate-200 p-3 text-slate-800 shadow hover:bg-slate-100">
      <img
        className="absolute inset-y-0 left-0 h-full w-48 rounded-l-lg object-cover"
        src={wasteItem.imageUri}
        alt={wasteItem.name}
      />
      <div className="ml-48">
        <div className="font-semibold">{wasteItem.name}</div>
        {wasteItem.description && (
          <div className="text-sm">{wasteItem.description}</div>
        )}
        {wasteItem.examples && (
          <div className="text-sm italic">{wasteItem.examples}</div>
        )}
        <div className="text-sm font-semibold">
          EUR {wasteItem.price.toFixed(2)} per {wasteItem.unit}
          {wasteItem.maxAmount && (
            <span className="text-sm"> (maximum of {wasteItem.maxAmount})</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default WasteItemListItem;
