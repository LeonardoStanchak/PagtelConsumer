import { ClienteModel } from './../models/ClienteModel';
import { Cliente } from "../models/ClienteModel";

export default class ClienteController{
    async save(cliente: Cliente): Promise<Cliente>{
        const newCliente = await ClienteModel.create(cliente)
        return newCliente
    }
    async findCliente(cliente: Cliente): Promise<Cliente[]>{

        const lastCliente: Cliente[]= await ClienteModel.find()
        return lastCliente
    }
}