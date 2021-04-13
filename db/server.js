const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 6500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// const getNotes = 
console.log(fs.readFileSync('./db.json', 'utf8', (err, data)=>{
    if(err){
        throw err
    }; 
    // console.log(data);
    return;
}));

app.post('./api/notes', (req, res) => {
    fs.appendFile('./db/db.json', req.body, 'utf8', (err, data) => {
        if(err){
            throw err
        }
        console.log(data);
        return
    })
})

app.get('/api/notes', (req, res)=>{
    res.send(fs.readFile('./db.json', 'utf8', (err, data)=>{
        if(err){
            throw err;
        }; 
        return;
    }))
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));

app.get('*', (req, res) => {
    //catch all
    res.end();
});

app.listen(port, () => console.log(`running on ${port}`))