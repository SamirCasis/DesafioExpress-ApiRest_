import generateHATEOAS from '../helpers/HATEOAS.js'
import { jewelsHateoas, jewelsFilter } from '../models/jewels.model.js'

const viewJewels = async (req, res) => {
  try {
    const {
      limit,
      page,
      order_by: orderBy,
      stock_min: stockMin,
      precio_max: precioMax
    } = req.query
    const jewels = await jewelsFilter({
      limits: limit,
      page,
      order_by: orderBy,
      stock_min: stockMin,
      precio_max: precioMax
    })
    res.status(200).json(jewels)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener joyas' })
  }
}

const jewelsHateoasRes = async (req, res) => {
  try {
    const allJewels = await jewelsHateoas()
    const allJewelsHateoas = await generateHATEOAS('jewels', allJewels)
    res.status(200).json({ jewels: allJewelsHateoas })
  } catch (error) {
    const errorFound = findError(error.code)
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message})
  }
}

const errorAll = (_, res) => {
  res.status(404).json({ message: 'Ruta incorrecta' })
}

export { viewJewels, jewelsHateoasRes, errorAll }
