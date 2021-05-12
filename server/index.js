const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'octopus_bi'
});


app.get('/students', (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.get('/marks/:id/:startDate/:endDate', function(req, res) {
    db.query("call getMarks(?, ?, ?);",[(req.params.id == 'null')? null: req.params.id, req.params.startDate, req.params.endDate],(err, result) => {
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.listen(3001, ()=> {
    console.log("Server is running");
})