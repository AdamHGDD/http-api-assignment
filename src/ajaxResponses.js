// File accessing include
const fs = require('fs');

// Method for HTMl request
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};
// Method for style request
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

// Export methods
module.exports.getIndex = getIndex;
module.exports.getStyle = getStyle;
