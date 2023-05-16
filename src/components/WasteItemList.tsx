import { WasteItem } from '../services/maex';
import WasteItemListItem from './WasteItemListItem';

interface Props {
  wasteItems: WasteItem[];
}

function WasteItemList({ wasteItems }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {wasteItems.map(item => (
        <WasteItemListItem key={item.id} wasteItem={item} />
      ))}
    </ul>
  );
}

export default WasteItemList;
