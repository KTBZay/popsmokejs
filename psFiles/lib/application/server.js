const { pop } = require('../eventHandler/src/src');
const newDatabase = (name, {host,user, password}) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: host,
        user: user,
        password: password
    })
    conn.connect((err)=>{
        if(err) throw err;
        console.log(`[E]: Creating Database`);
        const db_init = `CREATE DATABASE ${name}`;
            conn.query(db_init, (err)=>{
                if(err) throw err;
                console.log(`[E]: Created db`)
            })
    })
}
const NewApplication = async (name,root, db, {host, user , password }) => {
    console.log(`[E]: Creating application, you may need mysql to run interact with this function. YOu only need to run this once`)
    setTimeout(() => {
        const mysql = require('mysql');
        const conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: db
        })
        const systemCreatetable = `CREATE TABLE SystemData(name VARCHAR (255), root VARCHAR (255), host VARCHAR (255), user VARCHAR (255), password VARCHAR (255))`
        conn.connect((err)=>{
            if(err) throw err;
            console.log('[E]: SQL connected')
            pop.send('sql_ready')
        })
        const fs = require('fs');
        setTimeout(() => {
            conn.query(systemCreatetable, (err)=>{
                if(err) throw err;
                console.log(`[E]: Creating systemtable`)
            })
            setTimeout(() => {
                const SystemData = `INSERT INTO SystemData(name,root,host,user,password) VALUES ('${name}', '${root}', '${host}', '${user}', '${password}')`;
                conn.query(SystemData, (err)=>{
                    if(err) throw err;
                    console.log(`[E]: Inserted data in to system table`)
                })
                if(!fs.existsSync(root)){
                    fs.mkdirSync(root, {recursive: true})
                }
                var uuid = require("uuid");
                var id = uuid.v4();
                const ServiceIP = () => Array(4).fill(0).map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0)).join('.');
                fs.writeFileSync(`${root}/SQLprofile.pjs`, `Host: ${host}, User: ${user}`);
                fs.writeFileSync(`${root}/Projectprofile.pjs`, `Name: ${name}, Root: ${root}, Host: ${host}, User: ${user}`);
                fs.writeFileSync(`${root}/api.pjs`,`API: "${id}"\nIP:"${ServiceIP()}"`)
                pop.on('api_Set', ()=>{
                    const Data = fs.readFileSync(`${root}/api.pjs`);
                    const serverapi_endpoints = `CREATE TABLE ServerEndpoints(DATA TEXT (655))`;
                    conn.query(serverapi_endpoints, (err)=>{
                        if(err) throw err;
                        console.log(`[E]: Creating ServerEndpoints..`)
                    })
                    const server_res = `INSERT INTO ServerEndpoints(DATA) VALUES ('${Data}') `;
                    conn.query(server_res, (err)=>{
                        if(err) throw err;
                        console.log(`[E]: Inserted data in ServerEndpoints`)
                    })
                    console.log(`[E]: Project linked to a vps.\n${Data}`)
                })
                pop.send('api_Set')
            },3000)
        }, 2000);
    }, 14000);
}
module.exports = {
    NewApplication,
    newDatabase
}