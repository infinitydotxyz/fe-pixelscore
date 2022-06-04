import { useState } from 'react';
import { NFTCard } from 'utils/types/be-types';

interface CardSelectionResult {
  toggleSelection: (data: NFTCard) => void;
  isSelected: (data: NFTCard) => boolean;
  removeFromSelection: (data: NFTCard) => void;
  selection: NFTCard[];
  clearSelection: () => void;
}

export const useCardSelection = (): CardSelectionResult => {
  const [selection, setSelection] = useState<NFTCard[]>([]);

  const toggleSelection = (data: NFTCard) => {
    const i = indexOfSelection(data);

    if (i === -1) {
      setSelection([...selection, data]);
    } else {
      removeFromSelection(data);
    }
  };

  const indexOfSelection = (value: NFTCard): number => {
    const i = selection.findIndex((token) => {
      return value.id === token.id;
    });

    return i;
  };

  const removeFromSelection = (value: NFTCard) => {
    const i = indexOfSelection(value);

    if (i !== -1) {
      const copy = [...selection];
      copy.splice(i, 1);

      setSelection(copy);
    }
  };

  const isSelected = (value: NFTCard): boolean => {
    return indexOfSelection(value) !== -1;
  };

  const clearSelection = () => {
    setSelection([]);
  };

  return { selection, isSelected, clearSelection, toggleSelection, removeFromSelection };
};
