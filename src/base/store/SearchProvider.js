import { useReducer } from 'react';

import SearchContext from './SearchContext';
import reducer, { initialState } from './SearchReducer';

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={[state, dispatch]}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
