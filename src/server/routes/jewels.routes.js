import { Router } from 'express'
import { viewJewels, jewelsHateoasRes } from '../controllers/jewels.controllers.js'

const router = Router()

router.get('/joyas', jewelsHateoasRes)
router.get('/joyas/filtros', viewJewels)


export default router
