const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/', (re, res) => {
    return res.json('From Backend Side')
})

app.get('/users', (re, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.listen(8806, () => {
    console.log('Listening');
})