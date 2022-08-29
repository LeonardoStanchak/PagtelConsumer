import { Router } from 'express';
import EntregaController from '../controllers/EntregaController';

export const EntregaRouter = Router();
const EntregaCtr = new EntregaController();