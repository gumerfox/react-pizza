import React from 'react'
import { SearchContext } from '../../App'
import styles from './search.module.scss'

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext)

  return (
    <div>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.root}
        placeholder="Поиск пиццы ..."
      />
    </div>
  )
}
export default Search
