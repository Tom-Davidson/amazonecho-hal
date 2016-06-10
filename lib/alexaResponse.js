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
