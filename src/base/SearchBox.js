import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiXCircle } from 'react-icons/hi';

import { ProductFilteredContext } from '../App';
import { useStore, useDebounce } from './store';
import '../styles/SearchBox.scss';

const SearchBox = () => {
  const sanPham = useSelector((state) => state.SanPhamReducer.sanPham);
  const [state, dispatch] = useStore();
  const { searchInput, searchHistory } = state;
  const [resultSearchSanPham, setResultSearchSanPham] = useState([]);
  const [resultSearchHistory, setResultSearchHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const searchInputRef = useRef();
  const debouncedValue = useDebounce(searchInput, 800);
  const [, setProductFiltered] = useContext(ProductFilteredContext);

  const handleChangeSearchInput = (event) => {
    const searchValue = event.target.value;

    if (!searchValue.startsWith(' ')) {
      dispatch({
        type: 'setSearchInputValue',
        payload: searchValue,
      });
    }
  };

  // Show kết quả search khi input đang focus
  const handleShowResult = () => {
    setShowResult(true);
  };

  // Hide kết quả search khi blur ra ngoài
  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleSaveSearchHistory = (event) => {
    if (event.key === 'Enter') {
      if (searchInput.trim() !== '') {
        dispatch({
          type: 'saveSearchHistory',
          payload: searchInput,
        });
        setProductFiltered(searchInput);
        searchInputRef.current.blur();
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    // Xử lý searchInput lần render đầu tiên là chuỗi rỗng
    // hoặc người dùng vô tình nhập vào một chuỗi rỗng
    if (!debouncedValue.trim()) {
      setResultSearchSanPham([]);
      return;
    }

    const filterSearchResult = () => {
      const resultFromHistory = searchHistory.slice(0, 3);
      const resultFromSanPham = sanPham
        .filter((item) =>
          item.ten.toLowerCase().includes(debouncedValue.toLowerCase())
        )
        .slice(0, 4);

      setResultSearchHistory([...resultFromHistory]);
      setResultSearchSanPham([...resultFromSanPham]);
    };

    filterSearchResult();
    // eslint-disable-next-line
  }, [debouncedValue]);

  const handleClearSearch = () => {
    dispatch({
      type: 'clearSearchInputValue',
    });
    setResultSearchSanPham([]);
    searchInputRef.current.focus();
  };

  return (
    <div className='search'>
      <div className='search__box'>
        <input
          ref={searchInputRef}
          type='text'
          placeholder='Search...'
          value={searchInput}
          onChange={handleChangeSearchInput}
          onKeyPress={handleSaveSearchHistory}
          onFocus={handleShowResult}
          onBlur={handleHideResult}
        />
        <span className='search__clear' onClick={handleClearSearch}>
          <HiXCircle size={13} />
        </span>
      </div>

      {showResult &&
        (resultSearchSanPham.length > 0 ? (
          <ul className='search__result'>
            <p className='search__result-header'>Lịch sử tìm kiếm</p>
            {resultSearchHistory.length > 0 &&
              resultSearchHistory.map((result, index) => (
                <li key={`${result} - ${index}`}>{result}</li>
              ))}

            <p className='search__result-header'>Gợi ý</p>
            {resultSearchSanPham.map((result, index) => (
              <li key={index}>
                <img
                  src={result.imgUrl}
                  alt={result.ten}
                  className='search__result-img'
                />
                <p className='search__result-text'>{result.ten}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className='search__result search__result-empty'>
            <p className='search__result-header'>Lịch sử tìm kiếm</p>
            {resultSearchHistory.length > 0 &&
              resultSearchHistory.map((result, index) => (
                <li key={`${result} - ${index}`}>{result}</li>
              ))}
            <hr />
            <li>Không tìm thấy sản phẩm {debouncedValue}</li>
          </ul>
        ))}
    </div>
  );
};

export default SearchBox;
