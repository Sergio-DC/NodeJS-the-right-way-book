const zmq = require('zeromq')

//Create subscriber endpoint
const subscriber = zmq.socket('sub')

//Subscribe to all messages
subscriber.subscribe('')

//Handle Messages from the publisher
subscriber.on('message', data => {
    const message = JSON.parse(data)
    const date = new Date(message.timestamp)
    console.log(`File ${message.filename} changed at ${date}`)
})

//Connect to publisher
subscriber.connect('tcp://localhost:8085')