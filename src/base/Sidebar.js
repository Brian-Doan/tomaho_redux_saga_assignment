import { useState, memo } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

import '../styles/Sidebar.scss';

const Sidebar = ({ setProductFiltered }) => {
  const [activeCategory, setActiveCategory] = useState('Category 1');

  const categoryList = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];

  const handleActiveCategoryOnClick = (category) => {
    setActiveCategory(category);
    setProductFiltered('');
  };

  return (
    <div className='sidebar'>
      <h1 className='sidebar__category-header'>
        <AiOutlineUnorderedList />
        DANH MỤC
      </h1>
      <ul className='sidebar__category-list'>
        {categoryList.map((category) => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => handleActiveCategoryOnClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Sidebar);
