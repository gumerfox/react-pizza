import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

import { TextField } from '@mui/material'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

const Search = () => {
  const { value, setValue } = React.useState('')
  const { setSearchValue } = React.useContext(SearchContext)
  const inputRef = React.useRef(null)

  const onClickClear = () => {
    inputRef.current.value = ''
    setSearchValue('')
    setValue('')
    // inputRef.current.focus()
  }

  const debounsedSearch = React.useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value)
      }, 500),
    [setSearchValue]
  )

  const onChangeInput = React.useCallback(
    (e) => {
      debounsedSearch(e.target.value)
      setValue(e.target.value)
    },
    [setValue, debounsedSearch]
  )
  return (
    <div>
      <TextField
        id="outlined-basic"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ManageSearchIcon />
            </InputAdornment>
          ),
        }}
        label="Поиск пиццы..."
        type="search"
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
        onClick={onClickClear}
        variant="outlined"
      />
    </div>
  )
}
export default Search
