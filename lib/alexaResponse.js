exports.blank = function () {
  return {
    'version': '1.0',
    'response': {
      'outputSpeech': {
        'type': 'PlainText',
        'text': ''
      },
      'card': {
        'type': 'Simple'
      },
      'shouldEndSession': true
    }
  }
};
exports.setMessage = function (response, type, message) {
  if (type == 'SSML'){
    response.response.outputSpeech.type = 'SSML';
    response.response.outputSpeech.ssml = message;
  }else{
    response.response.outputSpeech.type = 'PlainText';
    response.response.outputSpeech.text = message;
  }
  return response;
};
