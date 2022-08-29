import { Document, Schema, model } from 'mongoose';

export interface Pedido extends Document{
    NumeroPedido: string
	DataDoPedido: string
	FormaDePagamento: string
	cliente_id: string
	produto_id: string
    
}
const schema = new Schema<Pedido>({
    NumeroPedido:{ type: String, required: true },
	DataDoPedido:{ type: String, required: true },
	FormaDePagamento:{ type: String, required: true },
	cliente_id:{ type: String, required: true },
	produto_id:{ type: String, required: true },
})

export const PedidoModel = model<Pedido>("Pedido", schema)