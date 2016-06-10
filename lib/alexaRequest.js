exports.extract = function (hapiPayload) {
  const substituteRequest = Object.freeze({
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'Unknown'
      }
    }
  });
  if(hapiPayload != null){
    try{
      if(typeof(hapiPayload) == 'object') { // Stupid test harness wants to be overly helpful
        return hapiPayload;
      }else if (typeof(hapiPayload) == 'string') {
        return Object.freeze(JSON.parse(hapiPayload));
      }else{
        console.log('Unparsable Alexa Request - not a string or object.')
        return substituteRequest;
      }
    }catch(err){
      console.log('Unparsable Alexa Request: '+hapiPayload)
      return substituteRequest;
    }
  }else{
    console.log('Missing (null) Alexa Request.')
    return substituteRequest;
  }
};
exports.getType = function (request) {
  return request.request.type;
};
exports.getIntent = function (request) {
  return request.request.intent.name;
};
