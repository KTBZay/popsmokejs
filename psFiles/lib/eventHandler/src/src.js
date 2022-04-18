const events = require('events');
const Handler = new events.EventEmitter();
const pop = {}
pop.on = Handler.on
pop.send = Handler.emit
module.exports = {
    pop
}