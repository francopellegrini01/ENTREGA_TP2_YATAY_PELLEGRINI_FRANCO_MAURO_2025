import express from 'express';
import morgan from 'morgan';
import productAdminRouter from './routers/product-admin.router.js';
import productRouter from './routers/product.router.js';
import jwtRouter from './routers/admin.router.js';
import albumsRouters from './routers/albumsRouters.js';

const morgarnModule = morgan(':method :url :status :res[content-length] - :response-time ms');

const server = express();

// middleware --> transforma todas las peticiones que vienen desde body como json
server.use(express.json());
// middleware --> lo que hace es logging de las peticiones al server
server.use(morgarnModule);
// middleware de routing de products
server.use(productRouter);
// middleware de routing solo admin
server.use(productAdminRouter);

// middleraware para login del Admin
server.use(jwtRouter);

// Albums CSV
server.use(albumsRouters);

export default server;
