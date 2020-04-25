const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

// http.createServer(function(req, res){
//
//     res.writeHead( 200, { "content-Type" : 'text/plain' } )
//     res.end('Hello world');
//
// }).listen(3000, 'localhost');