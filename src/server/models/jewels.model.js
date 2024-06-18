import format from 'pg-format'
import linkDB from '../db/dBLink.js'

const jewelsHateoas = async ({limit = 2}) => {
  const jewelsData = await pool.query('SELECT * FROM inventario LIMIT $1', [limit])
  return jewelsData.rows
}

const jewelsFilter = ({
  limits = 2,
  order_by: orderBy = 'id_asc',
  page = 0,
  stock_min: stockMin,
  precio_max: precioMax
}) => {
  let consulta = 'SELECT * FROM inventario'
  const filters = []
  const values = []

  if (stockMin) {
    values.push(stockMin)
    filters.push(`stock >= $${values.length}`)
  }

  if (precioMax) {
    values.push(precioMax)
    filters.push(`precio <= $${values.length}`)
  }

  if (filters.length > 0) {
    consulta += ` WHERE ${filters.join(' AND ')}`
  }

  console.log(consulta)

  const [column, sort] = orderBy.split('_')
  const offSet = Math.abs(+page !== 0 ? page - 1 : 0) * limits
  const formatConsulta = format(`${consulta} ORDER BY %s %s LIMITS %s OFFSET %s;`, column, sort, limits, offSet)
  return linkDB(formatConsulta, values)
}



export { jewelsFilter, jewelsHateoas }
