import { useCallback, useMemo, useState } from "react";

/**
 * Generic selection state for tables, cards, lists, etc.
 */
export function useSelection({ items = [], getId = (item) => item.id } = {}) {
  const [selected, setSelected] = useState([]);

  const ids = useMemo(() => items.map(getId), [items, getId]);

  const allSelected =
    ids.length > 0 && ids.every((id) => selected.includes(id));

  const isSelected = useCallback(
    (item) => selected.includes(getId(item)),
    [selected, getId],
  );

  const toggle = useCallback(
    (item) => {
      const id = getId(item);

      setSelected((current) =>
        current.includes(id)
          ? current.filter((selectedId) => selectedId !== id)
          : [...current, id],
      );
    },
    [getId],
  );

  const toggleAll = useCallback(() => {
    setSelected((current) => {
      if (allSelected) {
        return current.filter((id) => !ids.includes(id));
      }

      return [...new Set([...current, ...ids])];
    });
  }, [allSelected, ids]);

  const clear = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    selected,
    setSelected,
    ids,
    allSelected,
    isSelected,
    toggle,
    toggleAll,
    clear,
  };
}
