import { jewelsData, jewelsDataFilters } from '../models/jewels.model.js'
import generateHATEOAS from '../helpers/HATEOAS.js'

const jewelsList = async (req, res) => {
  try {
    const { limits, order_by, page } = req.query
    const jewels = await jewelsData({ limits, order_by, page })
    const hateoas = await generateHATEOAS('joya', jewels)
    res.status(200).json(hateoas)
  } catch (error) {
    console.error('Error retrieving joyas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const jewelsListFilters = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query
    const joyas = await jewelsDataFilters({ precio_max, precio_min, categoria, metal })
    res.status(200).json(joyas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { jewelsList, jewelsListFilters }
