import React from 'react';
import styles from '../../../styles/SearchBar.module.scss';

interface Props {
    input:string,
    updateInput:Function
    addButtonAction?: any
}

const SearchBar: React.FunctionComponent<Props> = ({
  input, updateInput, addButtonAction,
}) => {
  const handleChange = (e) => {
    updateInput(e.target.value);
  };
  return (
    <div className={styles.searchbarWrapper}>
      <div className={styles.searchbar}>
        <img className={styles.searchIcon} src="/media/icons/searchBar/search.svg" alt="search" />
        <input type="text" value={input} onChange={handleChange} />
      </div>
      {addButtonAction !== undefined
        && (
          <button type="button" className={styles.addButton} onClick={addButtonAction}>
            <img className={styles.searchIcon} src="/media/icons/searchBar/add.svg" alt="add" />
          </button>
        )}
    </div>
  );
};

export default SearchBar;
