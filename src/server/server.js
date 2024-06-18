import express from 'express'
import cors from 'cors'
import { serverLog } from './middlewares/serverLog.middleware.js'
import jewelsRoutes from './routes/jewels.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(serverLog)

app.use('/jewels', jewelsRoutes)

app.listen(PORT, () => console.log(`Server ON -> http://localhost:${PORT}`))

export default app
