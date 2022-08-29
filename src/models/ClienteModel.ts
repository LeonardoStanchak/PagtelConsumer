import { Document, Schema, model } from 'mongoose';

export interface Cliente extends Document{
    NomeCompleto: string
	DataNascimento: string
	Cpf: string
	Cep: string
	Endereco: string
	Numero: string
	Complemento: string
	Referencia: string
    
}
const schema = new Schema<Cliente>({
    NomeCompleto:{ type: String, required: true },
	DataNascimento:{ type: String, required: true },
	Cpf:{ type: String, required: true },
	Cep:{ type: String, required: true },
	Endereco:{ type: String, required: true },
	Numero:{ type: String, required: true },
	Complemento:{ type: String, required: true },
	Referencia:{ type: String, required: true },
})

export const ClienteModel = model<Cliente>("Cliente", schema)