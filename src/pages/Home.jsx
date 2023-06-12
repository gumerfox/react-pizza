import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector((state) => state.filter.categoryId)

  const { searchValue } = React.useContext(SearchContext)

  const [pizzas, setPizzas] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  //const [categoryId, setCategoryId] = React.useState(0)
  const [sortId, setSortId] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  React.useEffect(() => {
    setLoading(true)

    const order = sortId.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortId.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(
      `https://63fcc98e859df29986c4af23.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
        setLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortId, searchValue])
  //pizzas.map((obj) =>
  //<PizzaBlock key={obj.id} {...obj} /> )

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
        <Sort value={sortId} onChangeSort={(i) => setSortId(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzases}
      </div>
    </div>
  )
}

export default Home
