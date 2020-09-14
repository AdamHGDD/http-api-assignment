// General method used by any default response
const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};



// Helper method for successes
const getSuccess = (request, response, acceptedTypes) => {
  // Response object with message
  const jsonReturn = {
    message: 'This is a successful response'
  };

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 200);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 200);
};

// Helper method for bad requests (this one uses params)
const getBad = (request, response, acceptedTypes, params) => {
  // Default response object with only a message
  const jsonReturn = {
    message: 'This response has the required parameters',
  };

  // Check paramsto see if object needs it's information switched out
  if (!params.valid || params.valid !== 'true') {
    jsonReturn.id = 'badRequest';
    jsonReturn.message = 'Missing valid query parameter set to true';
  }

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if(jsonReturn.id)
    {
      responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    }
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 400);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 400);
};

// Helper method for unauthorized access (this one uses params)
const getUnauthorized = (request, response, acceptedTypes, params) => {
  // Default response object with only a message
  const jsonReturn = {
    message: 'You have successfully viewed the content',
  };

  // Check paramsto see if object needs it's information switched out
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    jsonReturn.id = 'unauthorized';
    jsonReturn.message = 'Missing loggedIn query parameter set to yes';
  }

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    if(jsonReturn.id)
    {
      responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    }
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 401);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 401);
};

// Helper method for forbidden access
const getForbidden = (request, response, acceptedTypes) => {
  // Response object with message and id
  const jsonReturn = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 403);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 403);
};

// Helper method for internal server errors
const getInternalError = (request, response, acceptedTypes) => {
  // Response object with message and id
  const jsonReturn = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong.',
  };

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 500);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 500);
};

// Helper method for not implemented
const getNotImplemented = (request, response, acceptedTypes) => {
  // Response object with message and id
  const jsonReturn = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 501);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 501);
};

// Helper method for if the page is not found
const getNotFound = (request, response, acceptedTypes) => {
  // Response object with message and id
  const jsonReturn = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  // XML object early return
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 404);
  }

  // JSON object return
  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 404);
};



// All exports for server.js to use
module.exports.getSuccess = getSuccess;
module.exports.getBad = getBad;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternalError = getInternalError;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getNotFound = getNotFound;
