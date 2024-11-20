import  express  from 'express';
import { estado_espejo, registrar_tarea_espejo, vertarea_espejo } from '../controller/app.controller.js';

const router = express.Router();


router.post('/registrar-tarea', registrar_tarea_espejo);
router.post('/ver-tarea', vertarea_espejo);
router.post('/actualizar-estado', estado_espejo);
//creacion de rutas 

export default router;
