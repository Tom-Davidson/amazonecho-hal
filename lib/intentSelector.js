module.exports = function(intent) {
  switch(intent){
    case 'OpenAirlock':
      return {
        messageType: 'PlainText',
        message: 'I\'m sorry, Dave. I\'m afraid I can\'t do that.'
      }
      break;
    default:
      return {
        messageType: 'PlainText',
        message: 'Unrecognised intent'
      }
      break;
  }
}
