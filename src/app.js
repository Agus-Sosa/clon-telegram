import express from 'express'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import routerView from './routers/view.router.js'



const app = express();
const port = 3030;

const httpServer = app.listen(port, () => {
    console.log('Server Up')
})

const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use('/', routerView)


let messages = []

io.on('connection', socket=> {
    // console.log(`Cliente ${socket.id} conectado`)
    io.emit('logs', messages)
    socket.broadcast.emit('newUser')
    socket.on('message', data => {
        messages.push(data)
        io.emit('logs', messages)
    })
})
