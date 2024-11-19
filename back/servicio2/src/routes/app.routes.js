import  express  from 'express';
import { registro } from '../controller/app.controller.js';

const router = express.Router();

//creacion de rutas 
router.post('/registro',registro)
export default router;