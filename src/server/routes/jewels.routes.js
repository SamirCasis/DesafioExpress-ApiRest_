import { Router } from 'express'
import { jewelsList, jewelsListFilters } from '../controllers/jewels.controllers.js'

const router = Router()

router.get('/joyas', jewelsList)
router.get('/joyas/filtros', jewelsListFilters)

export default router
