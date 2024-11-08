import  express  from 'express';
import { registro } from '../controller/app.controller';

const router = express.Router();

//creacion de rutas 
router.post('/registro',registro)
export default router;