const mysql=require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'todo'
});

exports.query=(sql)=>{
    return new Promise(resolve => {
        connection.connect();
        connection.query(sql, function (error, results) {
            if (error) throw error;
            resolve(results);
            connection.end();
        });
    })
};