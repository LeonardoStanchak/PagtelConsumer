import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import ProdutoController from "../controllers/ProdutoController"
import { Produto } from "../models/ProdutoModels"

export default class ProdutoMessageChannel{
    private _channel: Channel
    private _produtoCtrl: ProdutoController
    private _io: Server
    constructor(server: http.Server) {
        this._produtoCtrl = new ProdutoController()
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
            this._channel.assertQueue(process.env.QUEUE_NAME_PRODUTO)
        } catch (err) {
            console.log('Connection to RabbitMQ failed')
            console.log(err)
        }
    }

    async consumeMessages() {
        await this._createMessageChanel()
        if (this._channel) {
            this._channel.consume(process.env.QUEUE_NAME_PRODUTO, async msg => {
                const produtoObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(produtoObj)
                this._channel.ack(msg)

                const produto: Produto = produtoObj
                await this._produtoCtrl.save(produtoObj)
                console.log('Produto salvo no MongoDb')
            })

            console.log('Produto consumer started')
        }
    }
}