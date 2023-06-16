import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { SearchContext } from '../App'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import Pagination from '@mui/material/Pagination'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const { searchValue } = React.useContext(SearchContext)

  const [pizzas, setPizzas] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  //для пагинации
  const onChangePage = (_, number) => {
    dispatch(setCurrentPage(number))
    //(_, num) => setCurrentPage(num)
  }

  React.useEffect(() => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    //fetch(https://63fcc98e859df29986c4af23.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order})
    //.then((res) => res.json())
    //.then((json) => {
    //setPizzas(json)
    //setLoading(false)
    //})

    const BASE_URL = 'https://63fcc98e859df29986c4af23.mockapi.io/items?'

    axios
      .get(
        BASE_URL +
          `${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4`
      )
      .then((res) => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
  //pizzas.map((obj) =>
  //<PizzaBlock key={obj.id} {...obj} /> )
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ))

  const pizzases = pizzas
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      return false
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzases}</div>
      <Pagination
        count={3}
        page={currentPage}
        color="primary"
        onChange={onChangePage}
        //(_, num) => setCurrentPage(num)
      />
    </div>
  )
}
export default Home
