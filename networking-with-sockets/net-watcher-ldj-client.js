/**
 * @filename: net-watcher-json-client.js
 * The following script is an implementation of a socket client trying to
 * connect to service in port 8085
 **/ 

const net = require('net')
//The client object is a socket, just like the object 'connection' on the server side
const netClient = net.connect({port: 8085})
const ldjClient = require('./lib/ldj-client.js').connect(netClient)//The stream is passed to the constructor

ldjClient.on('message', message => {
    if(message.type == 'watching')
	    process.stdout.write(`Now watching: ${message.file}`)
    else if(message.type == 'changed')
	    console.log(`File Changed: ${new Date(message.timestamp)}`)
    else
	    throw new Error(`Unrecognized Message Type: ${message.type}`)
})
