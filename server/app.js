const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//SET UP MYSQL CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'devuser',
    password: 'Trutodru12#',
    database: 'list_maker'
});

//CONNECT TO DB
db.connect((err) => {
    if (err) {
        throw err;
    };
    console.log('mysql connected');
});

//SET UP EXPRESS
const app = express();
const port = process.env.PORT || 3001;
//this is required in order to read the body property off the request object, when making a POST.
app.use(express.json());
app.use(cors());


//GET
app.get('/', (req, res) => {
    console.log(req.query);
    res.send(req.query);
});


app.get('/db', (req, res) => {
    console.log('get request req.query ', req.query); //why doesnt the documentation mention this? wtf. and it doesnt take params?
    let sql = `SELECT * FROM items WHERE user_Id = ${req.query.userId};`
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
  });

//POST
//need to add quotes around body content.
app.post('/post', (req, res) => {
    console.log('post request req.body =', req.body);
    let sql = `INSERT INTO items (content, user_id) VALUES ("${req.body.content}", ${req.body.userId});`
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

//DELETE
app.delete('/delete', (req, res) => {
    console.log('delete request req.body ', req.body);
    let sql = `DELETE FROM items WHERE id = '${req.body.id}' AND user_id = ${req.body.userId};`
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
})

// app.delete('/delete', (req, res) => {
//     console.log('req.body =', req.body);
//     console.log('req.body.content =', req.body.content);
//     let sql = `DELETE FROM items WHERE content = '${req.body.content}';`
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send(results);
//     });
// })

//LISTEN
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})