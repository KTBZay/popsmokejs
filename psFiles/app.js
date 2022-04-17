const { NewApplication } = require("./lib/application/server");
const { read } = require("./lib/readApplication/read");
const ECHO = {};
ECHO.data = [];
ECHO.methods = {};
ECHO.get = {}
ECHO.get.profile = {
    name: 'PopSmokeJs',
    version: '1.2x'
};
ECHO.methods.ReadAppData = read;
ECHO.methods.NewApp = NewApplication;
ECHO.methods.ClearPanel = console.clear;
ECHO.methods.SystemInit = () => {
    console.clear();
    console.log(`[PS]: PopSmokeJs created by Zay\n[PS-EchoData-V]: ${ECHO.profile.version}`)
}
ECHO.methods.uploadCFX = function (cfx) {
    ECHO.data.push(cfx)
};
ECHO.methods.kill = async (bot,cfx) =>{
    bot.on('message',(msg) => {
        if (msg.content === `${cfx.BotSettings.prefix}restart`) {
            const cycleone = 14000
            msg.channel.send(`[PS]:  PopSmokeJs created by Zay,Version: ${ECHO.profile.version}, We are sending the reset signal`)
            setTimeout(()=>{
                msg.channel.send(`[E]: We are refreashing the bot please wait`)
                setTimeout(()=>{
                    console.log(`[E]: Shutting down`);
                    msg.channel.send(`[E]: Restarting now!`)
                    bot.destroy()
                    bot.login(cfx.BotSettings.token)
                    setTimeout(()=>{
                        msg.channel.send(`[E]: i have susccessfully restarted`)
                    },5000)
                },1000 )
            },cycleone)
        }
    })
};
ECHO.methods.Guildinit = async (bot,cfx) => {
    bot.on('message',(msg) => {
        if (msg.content === `${cfx.BotSettings.prefix}Ginit`) {
            msg.channel.send(`[E]: Initalizing Guild`);
            setTimeout(() => {
                msg.channel.send(`[E]: Touching server`);
                setTimeout(()=>{
                    msg.channel.send(`[E]: Server had susccessfully connected`);
                    msg.channel.send(`[E]: Awaiting client connection`)
                    setTimeout(()=>{
                        msg.channel.send(`[E]: Client_server connection made`);
                        msg.channel.send(`[E]: Uploading data`);
                        msg.channel.send(`[E]: Guild uploaded`)
                    })
                },1000)
            }, 14000);
        }
    })
};
module.exports = {
    ECHO
}