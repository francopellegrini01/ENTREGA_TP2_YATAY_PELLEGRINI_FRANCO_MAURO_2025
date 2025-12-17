//ESTO LO COMENTO PORQUE ES CON API-KEY Y NO JWT

// ESTO ES LA CAPA PARA EL LOGUEO DE ADMIN, CON JWT

import express from 'express';

import { loginAdmin } from '../controllers/admin.login.controller.js';

const jwtRouter = express.Router();

//CADA VEZ QUE QUIERA LOGEARSE QUIERO HACER UN POST A ESTA RUTA, PARA QUE SE PUEDA AUTENTICAR
jwtRouter.post('/user/login', loginAdmin);

export default jwtRouter;
