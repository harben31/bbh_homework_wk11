const app = require('express').Router();
const fs = require('fs');

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

module.exports = app;