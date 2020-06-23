/** 
 * @filename: test-json-service.js
 * To run this test service execute the following command: $ node test-json-service.js
 * and connect a client (net-watcher-json-client.js) to this service.
 */

const server = require('net').createServer(connection => {
    console.log("Subscriber Connected")

    //Two Message chunks that together make a whole message
    //If you look carefully at the last character of the firstChunk the incomplete word timesta
    //does not be closed by a right curly-brace. it's closed in the second chunk 
    const firstChunk = '{"type":"changed", "timesta'
    const secondChunk = 'mp":1450694370094}\n'

    //Send the first chunk immeadiately
    connection.write(firstChunk)

    //After a short delay, send the other chunk
    const timer = setTimeout(() => {
	    connection.write(secondChunk)
	    connection.end()
    }, 100)

    //Clear timer when the connection ends
    connection.on('end', () => {
	    clearTimeout(timer)
	    console.log('Subscriber disconnected')
    })
})

server.listen(8085, () => {
    console.log('Test server listening for subscribers')
})
