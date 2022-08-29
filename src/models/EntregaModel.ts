import { Document, Schema, model } from 'mongoose';

export interface Entrega extends Document{
    DataDaEntrega: string
	Status: string
	pedido_id: string
	
    
}
const schema = new Schema<Entrega>({
    DataDaEntrega:{ type: String, required: true },
	Status:{ type: String, required: true },
	pedido_id:{ type: String, required: true },
})

export const EntregaModel = model<Entrega>("Entrega", schema)