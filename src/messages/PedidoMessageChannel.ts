import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import PedidoController from "../controllers/PedidoController"
import { Pedido } from "../models/PedidoModel"

export default class PedidoMessageChannel{
    private _channel: Channel
    private _pedidoCtrl: PedidoController
    private _io: Server
    constructor(server: http.Server) {
        this._pedidoCtrl = new PedidoController()
        this._io = new Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        })
        this._io.on('connection', () => console.log('Web socket connection created'))
    }

    private async _createMessageChanel() {
        try {
            const connection = await connect(process.env.AMQP_SERVER)
            this._channel = await connection.createChannel()
            this._channel.assertQueue(process.env.QUEUE_NAME_PEDIDO)
        } catch (err) {
            console.log('Connection to RabbitMQ failed')
            console.log(err)
        }
    }

    async consumeMessages() {
        await this._createMessageChanel()
        if (this._channel) {
            this._channel.consume(process.env.QUEUE_NAME_PEDIDO, async msg => {
                const pedidoObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(pedidoObj)
                this._channel.ack(msg)

                const pedido: Pedido = pedidoObj
                await this._pedidoCtrl.save(pedidoObj)
                console.log('Pedido salvo no MongoDb')
            })

            console.log('Candle consumer started')
        }
    }
}