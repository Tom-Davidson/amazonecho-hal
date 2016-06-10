exports.extract = function (hapiPayload) {
  try{
    return Object.freeze(JSON.parse(hapiPayload));
  }catch(err){
    console.log('Unparsable Alexa Request: '+hapiPayload)
    return Object.freeze({
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'Unknown'
        }
      }
    });
  }
};
