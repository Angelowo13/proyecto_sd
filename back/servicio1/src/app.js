import  express  from 'express';
import indexrouter from './routes/app.routes.js';

import { PORT } from './config/app.config.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(indexrouter)
app.listen(PORT)

console.log('http://localhost:3000/')