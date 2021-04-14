const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 6500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));


// console.log(fs.readFileSync('./db.json', 'utf8', (err, data)=>{
//     if(err){
//         throw err
//     };
//     return;
// }));

app.delete('/api/notes/:id', (req, res)=>{
    fs.readFile('./db/db.json', (err, data)=>{
        if(err) throw err;
      
        const json = JSON.parse(data);
        const paramNumber = Number(req.params.id)
        for (let i = 0; i < json.length; i++) {
            // console.log(json[i]);
            // console.log(req.params.id);
            if(json[i].id===paramNumber){
                console.log(json);
                // console.log(i, 1, "");
                json.splice(i, 1);
                console.log(json);
            }
        }
        // console.log(json)
        fs.writeFile('./db/db.json', JSON.stringify(json), (err, data)=>{
            if(err) throw err
        })
    })
    res.end()
})

idCount = 1;
app.post('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', (err, data)=>{
        if (err) throw err;
        const json = JSON.parse(data);
        const newNoteObj = req.body;
        newNoteObj.id = idCount;
        json.push(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(json), (err, data)=>{
            if(err) throw err
        })
    })
    idCount++;
    res.end();
});

app.get('/api/notes', (req, res)=>{
    
    fs.readFile('./db/db.json', 'utf8', (err, data)=>{
        if(err) throw err;
        res.send(data)
    })
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('*', (req, res) => {
    //catch all
    res.end();
});

app.listen(port, () => console.log(`running on ${port}`))