const { EventEmitter } = require('events');

// One shared emitter for the whole app. Controllers emit; listeners react.
module.exports = new EventEmitter();
