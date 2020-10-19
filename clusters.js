'use strict'

const cluster = require('cluster')
const cpusCount = require('os').cpus().length

if (cluster.isMaster) {
	for (let i = 0; i < cpusCount; i++) {
		cluster.fork()
	}
} else {
	require('./index.js')
}
