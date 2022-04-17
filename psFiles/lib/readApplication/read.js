const read = ( db, table, {host,user,pass}) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: db
    })
    conn.connect((err)=>{
        if(err) throw err;
        console.log('[E]: Retriving data')
        const GetTableData = `SELECT * FROM ${table}`;
        conn.query(GetTableData, (err,result, fields) => {
            if(err) throw err;
            console.log(`[E]: Data gathered = \n ` + result)
        })
    })
}
module.exports = {read};