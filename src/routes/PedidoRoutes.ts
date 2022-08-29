import { Router } from 'express';
import PedidoController from '../controllers/PedidoController';
export const ProdutoRouter = Router();
const PedidoCtr = new PedidoController();