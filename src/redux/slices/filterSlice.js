import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // для пагинации
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    //пагинация
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
})
// не забываем вытащить пагинацию
export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer
