import { useEffect, useState } from 'react';
import { NFTCard } from 'utils/types/be-types';

interface CardSelectionResult {
  toggleSelection: (data: NFTCard) => void;
  isSelected: (data: NFTCard) => boolean;
  isSelectable: (data: NFTCard) => boolean;
  removeFromSelection: (data: NFTCard) => void;
  selection: NFTCard[];
  clearSelection: () => void;
}

export const useCardSelection = (): CardSelectionResult => {
  const [selectionMap, setSelectionMap] = useState<Map<string, NFTCard>>(new Map());
  const [selection, setSelection] = useState<NFTCard[]>([]);

  useEffect(() => {
    setSelection(Array.from(selectionMap.values()));
  }, [selectionMap]);

  const toggleSelection = (value: NFTCard) => {
    if (!isSelected(value)) {
      // don't allow an already revealed and visible card to be added to cart
      if (!value.pixelRankVisible) {
        const copy = new Map(selectionMap);
        copy.set(value.id, value);

        setSelectionMap(copy);
      }
    } else {
      removeFromSelection(value);
    }
  };

  const isSelectable = (value: NFTCard): boolean => {
    return (value.isPixelRanked ?? false) && value.pixelRankVisible !== true;
  };

  const removeFromSelection = (value: NFTCard) => {
    if (isSelected(value)) {
      const copy = new Map(selectionMap);
      copy.delete(value.id);

      setSelectionMap(copy);
    }
  };

  const isSelected = (value: NFTCard): boolean => {
    return selectionMap.has(value.id);
  };

  const clearSelection = () => {
    setSelectionMap(new Map());
  };

  return { selection, isSelected, isSelectable, clearSelection, toggleSelection, removeFromSelection };
};
