const fs = require('fs')
const zmq = require('zeromq')
const { argv } = require('process')
const filename = process.argv[2]

//Create the publisher endpoint
const publisher = zmq.socket('pub')

fs.watch(filename, () => {
    //Send a message to any and all subscribers
    publisher.send(JSON.stringify({
        type: 'changed',
        filename: filename,
        timestamp: Date.now()      
    }))
})

publisher.bind('tcp://*:8085', err => {
    if(err)
        throw err
    console.log('Listening for zmq subscribe')
})