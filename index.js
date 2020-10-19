'use strict'

require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

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
