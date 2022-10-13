const initialState = {
  searchInput: '',
  searchHistory: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setSearchInputValue':
      return { ...state, searchInput: action.payload };
    case 'clearSearchInputValue':
      return { ...state, searchInput: '' };
    case 'saveSearchHistory':
      return {
        ...state,
        searchInput: '',
        searchHistory: [...state.searchHistory, action.payload],
      };
    default:
      return state;
  }
};

export { initialState };
export default reducer;
