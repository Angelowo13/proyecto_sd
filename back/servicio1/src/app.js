import  express  from 'express';
import indexrouter from './routes/app.routes.js';

import { PORT } from './config/app.config.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(indexrouter)

app.use((req,res,next)=> {
    res.status(404).json({
        message:"Endpoint not found"
    })
})
app.listen(PORT)

console.log('http://localhost:'+PORT+'/')
