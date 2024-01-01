var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stu_res"
})
con.connect();


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.get('/res', function (req, res) {

    var select_query = "select * from stu_tbl";

    con.query(select_query, function (error, result, field) {
        if (error) throw error;
        res.render('index', { result });
    });
})


app.post('/res', function (req, res) {
    var rno = req.body.rno;
    var name = req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;

    var insert_query = "insert into stu_tbl(rno,name,s1,s2,s3,s4,s5) values ('" + rno + "','" + name + "','" + s1 + "','" + s2 + "','" + s3 + "','" + s4 + "','" + s5 + "')"

    con.query(insert_query, function (error, result, field) {
        if (error) throw error;

        var total_query = "UPDATE stu_tbl SET total = s1 + s2 + s3 + s4 + s5 ";

        con.query(total_query, function (error1, result1, field1) {
            if (error1) throw error1;
        });
        res.redirect('/res');
    })
});

app.get('/delete/:rno', function (req, res) {

    var rno = req.params.rno;
    var delete_query = "delete from stu_tbl where rno =" + rno;

    con.query(delete_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/res');
    })
})

app.get('/update/:rno', function (req, res) {

    var rno = req.params.rno;
    var select_query = "select * from stu_tbl where rno = " + rno;

    con.query(select_query, function (error, result, field) {
        if (error) throw error;
        res.render('form', { result });
    })
});

app.post('/up', function (req, res) {
    var rno = req.body.rno;
    var name = req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;

    var update_query = "update stu_tbl set name = '" + name + "',s1 = '" + s1 + "',s2 = '" + s2 + "',s3 = '" + s3 + "',s4 = '" + s4 + "',s5 = '" + s5 + "' where rno = '" + rno + "'"

    con.query(update_query, function (error, result, field) {
        if (error) throw error;

        var total_query = "UPDATE stu_tbl SET total = s1 + s2 + s3 + s4 + s5 ";

        con.query(total_query, function (error1, result1, field1) {
            if (error1) throw error1;
        });
        res.redirect('/res');
    })
});

app.get('/ten',function(req,res){

    var select_query = "select * from stu_tbl order by total desc limit 10";

    con.query(select_query,function(error,result,field){
        if(error) throw error; 
        res.render('index',{result});
    })
});

app.get('/five',function(req,res){

    var select_query = "select * from stu_tbl order by total desc limit 5";

    con.query(select_query,function(error,result,field){
        if(error) throw error;
        res.render('index',{result});
    })
});



app.listen(3000);   