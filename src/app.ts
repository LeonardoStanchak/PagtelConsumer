
import { ClienteRouter } from './routes/ClienteRoutes';
import * as express from 'express'
import * as logger from 'morgan'
import * as cors from 'cors'
import { ProdutoRouter } from './routes/ProdutoRoutes';

export const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/cliente', ClienteRouter)
app.use('/produto', ProdutoRouter)
