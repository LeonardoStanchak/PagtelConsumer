import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import EntregaController from "../controllers/EntregaController"
import { Entrega } from "../models/EntregaModel"


export default class EntregaMessageChannel{
    private _channel: Channel
    private _entregaCtrl: EntregaController
    private _io: Server
    constructor(server: http.Server) {
        this._entregaCtrl = new EntregaController()
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
            this._channel.assertQueue(process.env.QUEUE_NAME_ENTREGA)
        } catch (err) {
            console.log('Connection to RabbitMQ failed')
            console.log(err)
        }
    }

    async consumeMessages() {
        await this._createMessageChanel()
        if (this._channel) {
            this._channel.consume(process.env.QUEUE_NAME_ENTREGA, async msg => {
                const entregaObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(entregaObj)
                this._channel.ack(msg)

                const entrega: Entrega = entregaObj
                await this._entregaCtrl.save(entregaObj)
                console.log('Entrega salva no mongoDb')
            })

            console.log('Entrega consumer started')
        }
    }
}