/* Custom hook */
import { useContext, useState, useEffect } from 'react';

import SearchContext from './SearchContext';

export const useStore = () => {
  const [state, dispatch] = useContext(SearchContext);

  return [state, dispatch];
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line
  }, [value]);

  return debouncedValue;
};
