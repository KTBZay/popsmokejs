### Welcome to psjs

# Template
const { ECHO } = require("../psjs/app");
ECHO.ws.on('on_ready', ()=>{
    console.log('Im online!')
})

ECHO.ws.on('New_app', ()=>{
   ECHO.methods.newDB('echo', {host:'localhost', user: 'root', password: ''});
   setTimeout(() => {
       ECHO.methods.NewApp('echo','../root/echo/','echo', {host:'localhost', user:'root', password:''})
   }, 5000);
})
ECHO.ws.login('New_app');
ECHO.ws.login('on_ready')
