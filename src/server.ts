import { config } from 'dotenv'
import { connection } from 'mongoose'
import { app } from './app'
import { connectToMongoDB } from './config/db'
import ClienteMessageChannel from './messages/ClienteMessagaChannel'
import EntregaMessageChannel from './messages/EntregaMessageChannel'
import PedidoMessageChannel from './messages/PedidoMessageChannel'
import ProdutoMessageChannel from './messages/ProdutoMessageChannel'

const createServer = async () => {
    config()

    await connectToMongoDB()
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => console.log(`App running on port ${PORT}`))

    const clienteMsgChannel = new ClienteMessageChannel(server)
    clienteMsgChannel.consumeMessages()

    const produtoMsgChannel = new ProdutoMessageChannel(server)
    produtoMsgChannel.consumeMessages()

    const pedidoMsgChannel = new PedidoMessageChannel(server)
    pedidoMsgChannel.consumeMessages()

    const entregaMsgChannel = new EntregaMessageChannel(server)
    entregaMsgChannel.consumeMessages()

    process.on('SIGINT', async () => {
        await connection.close()
        server.close()
        console.log('App server and connection to MongoDB closed')
    })
}

createServer()