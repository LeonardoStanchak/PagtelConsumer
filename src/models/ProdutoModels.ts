import { Document, Schema, model } from 'mongoose';

export interface Produto extends Document{
    NomeProduto: string
	Descricao: string
    Preco: string
    
}
const schema = new Schema<Produto>({
    NomeProduto:{ type: String, required: true },
	Descricao:{ type: String, required: true },
	Preco:{ type: String, required: true },
})

export const ProdutoModel = model<Produto>("Produto", schema)