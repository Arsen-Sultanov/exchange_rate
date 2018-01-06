var sql = require("mysql");
var conn = sql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: '12345',
        database: 'fc_barsa'
    });

conn.connect(function(err){
    if(err){
        console.log(err);
        console.log("could not connect to db!");
        process.abort();
    }
});

exports.test = function(res, login, password){
    var quer = "SELECT login_u, password_u FROM user WHERE login_u = '" + login + "' AND password_u = '" + password + "';"
        console.log(quer);
        conn.query(quer, function (error, results, fields) {
            if(error) throw error;
            else if(results.length == 0){
                res.send("результатов нет");
                return;
            }
            if(results[0].login_u == login && results[0].password_u == password){
            res.send("welcom " + results[0].login_u);};

        });
    };

exports.testLol = function(res, param){
    if(!param.start){ 
        param.start = 0;
        param.end = 6;
    } 
    var quer = "SELECT * FROM news WHERE id_news >'" + param.start + "' AND id_news < '" + param.end + "';";
    conn.query(quer, function (error, results, fields) {
        if(error) throw error;
        else if(results.length == 0){
            res.send("результатов нет");
            return;
        }
        res.send(results);
        });
    };

exports.moreInfo = function(res, param){
        var quer = "SELECT * FROM news WHERE id_news = '" + param.id + "';";
        console.log(quer);
        conn.query(quer, function (error, results, fields) {
            if(error) throw error;
            else if(results.length == 0){
                res.send("результатов нет");
                return;
            }
            res.send(results);
        });
    };


