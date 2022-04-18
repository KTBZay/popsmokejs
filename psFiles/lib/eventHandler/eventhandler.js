const { pop } = require("./src/src");
pop.on('ready', ()=>{
    console.log('[E]: Service has started')
})
pop.send('ready')
pop.on('sql_ready', ()=>{
    console.log(`[E]: Sql has started`)
})
pop.send('on_ready')
pop.send('New_app');
