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
      return Object.freeze(JSON.parse(hapiPayload));
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
