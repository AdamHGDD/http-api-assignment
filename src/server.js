// Basic includes
const http = require('http');
const url = require('url');
const pageHandler = require('./htmlResponses.js');

// Find a valid port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': pageHandler.getIndex,
  '/style.css': pageHandler.getStyle,
  index: pageHandler.getIndex,
};



// Request response code
const onRequest = (request, response) => {
  // Get parsed request information
  const parsedUrl = url.parse(request.url);
  // Get accepted typesfrom request headers
  const acceptedTypes = request.headers.accept.split(',');

  // Print out what the url was
  console.log(request.url);
  // Print out what the url's information was
  console.log(parsedUrl);



  // Call relevant method
  if (urlStruct[parsedUrl.pathname]) 
  {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } 
  else
  {
    urlStruct.index(request, response);
  }
};



// Call HTTP to set up request response function
http.createServer(onRequest).listen(port);

// Basic print for port
console.log(`Listening on 127.0.0.1: ${port}`);