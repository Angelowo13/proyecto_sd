import  express  from 'express';
import { login } from '../controller/app.controller.js';

const router = express.Router();
 
//creacion de rutas 
router.post ('/login',login)
export default router;
