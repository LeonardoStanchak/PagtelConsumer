import { Entrega, EntregaModel } from "../models/EntregaModel"

export default class EntregaController{
    async save(entrega: Entrega): Promise<Entrega>{
        const newEntrega = await EntregaModel.create(entrega)
        return newEntrega
    }
}