/**
 * @filename: net-watcher-json-client.js
 * The following script is an implementation of a socket client trying to
 * connect to service in port 8085
 **/ 

const net = require('net')
//The client object is a socket, just like the object 'connection' on the server side
const client = net.connect({port: 8085})

client.on('data', data => {
    const message = JSON.parse(data)
    if(message.type == 'watching')
	process.stdout.write(`Now watching ${message.file}`)
    else if(message.type == 'changed') {
	const date = new Date(message.timestamp)
	process.stdout.write(`File Changed: ${date}`)
    }
    else
	console.log(`Unrecognized message type: ${message.type}`)
})
