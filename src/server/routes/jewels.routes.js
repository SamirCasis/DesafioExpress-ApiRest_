import { Router } from 'express'
import { viewJewels, jewelsHateoasRes } from '../controllers/jewels.controllers.js'

const router = Router()

router.get('/joyas', viewJewels)
router.get('/joyas/filtro', jewelsHateoasRes)

export default router
