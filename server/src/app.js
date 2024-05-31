import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createServer } from 'http'
import { Server as socketServer } from 'socket.io'
import { FRONTEND } from './config.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())

const server = createServer(app)
const io = new socketServer(server, {
	cors: {
		origin: FRONTEND,
		methods: ['GET', 'POST'],
	},
})

let allPhrases = []
let winners = []

io.on('connection', (socket) => {
	console.log(`User ${socket.id} connected`)

	socket.on('request_initial_data', () => {
		socket.emit('send_initial_data', [...new Set(allPhrases)].sort())
	})

	socket.on('submit_phrases', (phrases) => {
		console.log(`Phrases Submitted:`)
		console.log(phrases)
		allPhrases = allPhrases.concat(phrases)
	})

	socket.on('request_all_phrases', () => {
		const filteredArray = [...new Set(allPhrases)].sort()
		console.log('sending phrases to client')
		console.log(filteredArray)
		socket.broadcast.emit('get_all_phrases', filteredArray)
	})

	socket.on('set_winner', (winnerPhrases) => {
		winners = []
		console.log('Sending winner phrases')
		console.log(winnerPhrases)
		socket.broadcast.emit('get_winner', winnerPhrases)
	})

	socket.on('reset_bingo', () => {
		console.log('reseting bingo')
		allPhrases = []
		winners = []
		socket.broadcast.emit('clear_bingo')
	})

	socket.on('send_winner', (username) => {
		winners.push(username)
		console.log('sending winners')
		console.log(winners)
		socket.broadcast.emit('get_winners', [...new Set(winners)].sort())
	})
})

export default server
