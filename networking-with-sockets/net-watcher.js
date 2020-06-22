/** 
 * @filename: net-watcher.js
 *
 * The following script binds a server to a TCP port, the server sends a reponse to the terminal 
 * client each time a target file is modified automatically by a terminal process.
 * 
 * To run and test the net-watcher-program, you'll need three terminal sessions:
 * one for the service itself, one for the client, and one to trigger changes to the watched file.
 * The order of execution commands in the terminals will be listed below:
 * 
 * First terminal will use: 
 *    $ watch -n 1 touch target.txt //to touch the target file at one-second intervals
 * Second terminal will use:
 *    $ node net-watcher-program.js target.txt //to execute the service   
 * Third terminal will use:
 *    $ nc localhost <port> // to connect to the service using a host and a portnumber
 **/
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename)
    throw new Error("No filename specified");

const server = net.createServer(connection => {
    //Reporting
    process.stdout.write("Subscriber Connected")
    connection.write(`Now watching ${filename} for changes....\n`)

    //Watcher Setup
    const watcher = fs.watch(filename, () => {
	connection.write(`File changed: ${new Date()}\n`)
    })

    
})

//Listening on TCP sockets
server.listen(8085, () => console.log("Server listening") )

//Listening on UNIX sockets
//server.listen('/tmp/watcher.sock'. () => process.stdout.write('Listening for subscribers'))
