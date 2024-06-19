import format from 'pg-format'
import linkDB from '../db/dBLink.js'

const jewelsData = async ({
  limits = 3,
  order_by: orderBy = 'stock_DESC',
  page = 0
}) => {
  const [field, direction] = orderBy.split('_')
  const offSet = (page - 1) * limits
  const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', field, direction, limits, offSet)
  console.log(formattedQuery)
  return linkDB(formattedQuery)
}

const jewelsDataFilters = async ({ precio_max, precio_min, categoria, metal }) => {
  let filter = []
  const values = []

  const addFilter = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filter
    filter.push(`${campo} ${comparador} $${length + 1}`)
  }

  if (precio_max) addFilter('precio', '<=', precio_max)
  if (precio_min) addFilter('precio', '>=', precio_min)
  if (categoria) addFilter('categoria', '=', categoria)
  if (metal) addFilter('metal', '=', metal)

  let consulta = 'SELECT * FROM inventario'

  if (filter.length > 0) {
    consulta += ` WHERE ${filter.join(' AND ')}`
  }

  try {
    const joyas = await linkDB(consulta, values)
    return joyas
  } catch (error) {
    console.error('Error fetching joyas:', error)
    throw error
  }
}

export { jewelsData, jewelsDataFilters }
