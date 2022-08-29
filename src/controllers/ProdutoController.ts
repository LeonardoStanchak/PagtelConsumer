import { Produto, ProdutoModel } from "../models/ProdutoModels"

export default class ProdutoController{
    async save(produto: Produto): Promise<Produto>{
        const newProduto = await ProdutoModel.create(produto)
        return newProduto
    }
}