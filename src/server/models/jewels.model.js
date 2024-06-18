import format from 'pg-format'
import linkDB from '../db/dBLink.js'

const jewelsHateoas = async ({ limit = 2, page = 0, order_by = 'stock_DESC' }) => {
  const [column, sort] = order_by.split('_')
  const offset = page * limit
  const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %L OFFSET %L', column, sort, limit, offset)
  const jewelsData = await linkDB(query)
  return jewelsData.rows
}

const jewelsFilter = ({
  limit = 2,
  order_by: orderBy = 'id_asc',
  page = 0,
  precio_min: precioMin,
  precio_max: precioMax,
  categoria,
  metal
}) => {
  let consulta = 'SELECT * FROM inventario'
  const filters = []
  const values = []

  if (precioMin) {
    values.push(precioMin)
    filters.push(`precio >= $${values.length}`)
  }

  if (precioMax) {
    values.push(precioMax)
    filters.push(`precio <= $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filters.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filters.push(`metal = $${values.length}`)
  }

  if (filters.length > 0) {
    consulta += ` WHERE ${filters.join(' AND ')}`
  }

  const [column, sort] = orderBy.split('_')
  const offset = page * limit
  const formatConsulta = format(`${consulta} ORDER BY %s %s LIMIT %L OFFSET %L`, column, sort, limit, offset)
  return linkDB(formatConsulta, values)
}

export { jewelsFilter, jewelsHateoas }

