const {EventEmitter} = require('events')


class LDJClient extends EventEmitter {
    //The stream parameter is an object that emits data events, such as Socket connection
    constructor(stream) {
	super()
	let buffer = ''
	stream.on('data', data => {
	    buffer += data //Append data in buffer
	    let boundary = buffer.indexOf('\n')//If the end of line character not exists return -1
	    while(boundary != -1) {
			const input = buffer.substring(0, boundary)
			buffer = buffer.substring(boundary + 1)
			this.emit('message', JSON.parse(input))
			boundary = buffer.indexOf('\n')
	    }
	})		  
    }
    static connect(stream) {
		return new LDJClient(stream)
    }
}

module.exports = LDJClient


