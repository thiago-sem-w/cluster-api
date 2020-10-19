'use strict'

require('dotenv').config()

const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())
if (app.get('env') === 'development') {
	app.use(morgan('dev'))
}

const port = process.env.PORT || 5000

app.get('/', async (request, response) => {
	response.json({
		ping: 'pong'
	})
})

app.use('*', async (request, response, next) => {
	response.status(404)
	next(new Error('ERROR!!!'))
})

app.use(async (error, request, response, next) => {
	const statusCode = response.statusCode || 500
	response
		.status(statusCode)
		.json({ error: error.message })
})

app.listen(port, console.log(`listening on *:${ port }`))
