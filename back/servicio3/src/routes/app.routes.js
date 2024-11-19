import  express  from 'express';
import { estado, registrar_tarea, vertarea } from '../controller/app.controller.js';

const router = express.Router();

//creacion de rutas 
router.post('/registrar_tarea',registrar_tarea)
router.post("/vertareas",vertarea)
router.post("/utarea",estado)



export default router;
