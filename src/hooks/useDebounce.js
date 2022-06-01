import { useEffect, useState } from "react";

export const useDebounce = (_value, _delay) => {
  const [debouncedValue, setDebouncedValue] = useState(_value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(_value);
    }, _delay);

    return () => {
      clearTimeout(handler);
    };
  }, [_value, _delay]);

  return [debouncedValue];
};
