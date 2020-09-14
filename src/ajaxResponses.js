const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};



const getSuccess = (request, response, acceptedTypes) => {
  const jsonReturn = {
    message: 'This is a successful response'
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 200);
  }

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 200);
};

const getBad = (request, response, acceptedTypes, params) => {
  const jsonReturn = {
    message: 'This response has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    jsonReturn.id = 'badRequest';
    jsonReturn.message = 'Missing valid query parameter set to true';
  }

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

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 400);
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const jsonReturn = {
    message: 'You have successfully viewed the content',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    jsonReturn.id = 'unauthorized';
    jsonReturn.message = 'Missing loggedIn query parameter set to yes';
  }

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

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 401);
};

const getForbidden = (request, response, acceptedTypes) => {
  const jsonReturn = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 403);
  }

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 403);
};

const getInternalError = (request, response, acceptedTypes) => {
  const jsonReturn = {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong.',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 500);
  }

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 500);
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const jsonReturn = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 501);
  }

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 501);
};

const getNotFound = (request, response, acceptedTypes) => {
  const jsonReturn = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${jsonReturn.id}</id>`;
    responseXML = `${responseXML} <message>${jsonReturn.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml', 404);
  }

  const jsonString = JSON.stringify(jsonReturn);
  return respond(request, response, jsonString, 'application/json', 404);
};

module.exports.getSuccess = getSuccess;
module.exports.getBad = getBad;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternalError = getInternalError;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getNotFound = getNotFound;
