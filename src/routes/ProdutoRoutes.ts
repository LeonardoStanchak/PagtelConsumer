import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController';
export const ProdutoRouter = Router();
const ProdutoCtr = new ProdutoController();