import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import ClienteController from "../controllers/ClienteController"
import { Cliente } from "../models/ClienteModel"

export default class ClienteMessageChannel{
    private _channel: Channel
    private _clienteCtrl: ClienteController
    private _io: Server
    constructor(server: http.Server) {
        this._clienteCtrl = new ClienteController()
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
            this._channel.assertQueue(process.env.QUEUE_NAME_CLIENTE)
        } catch (err) {
            console.log('Connection to RabbitMQ failed')
            console.log(err)
        }
    }

    async consumeMessages() {
        await this._createMessageChanel()
        if (this._channel) {
            this._channel.consume(process.env.QUEUE_NAME_CLIENTE, async msg => {
                const clienteObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(clienteObj)
                this._channel.ack(msg)

                const cliente: Cliente = clienteObj
                await this._clienteCtrl.save(clienteObj)
                console.log('Cliente salvo no  MongoDb')
            })

            console.log('Cliente consumer started')
        }
    }
}