import { Pedido, PedidoModel } from "../models/PedidoModel"

export default class PedidoController{
    async save(pedido: Pedido): Promise<Pedido>{
        const newPedido = await PedidoModel.create(pedido)
        return newPedido
    }
}