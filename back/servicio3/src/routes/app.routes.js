import  express  from 'express';
import { registrar_tarea } from '../controller/app.controller';

const router = express.Router();

//creacion de rutas 
router.post('/registrar_tarea',registrar_tarea)

export default router;
