const EventEmitter = require('events');

const em = new EventEmitter();

em.on('demo',()=>{
    console.log('demo')
})

em.emit('demo');