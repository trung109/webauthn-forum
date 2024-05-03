var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

//EASTER EGG

Feelthesauce = (req, res, next) => {
    if ((Math.floor(Math.random() * 100) + 1) === 69) {
        next();
    } else {
        res.redirect('/home');
    }
}

router.get('/', Feelthesauce, (req, res) => {
    res.redirect('/video');
});

router.get('/video', (req, res) => {
    const videoPath = path.join('easteregg', 'ok.mp4');

    // Stream the video file to the client
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});


// MAIN WEB INDEX - TODO: Route for login

router.get('/home', (req, res) => {
    res.render('index', { title: 'Express', message: 'Welcome to express' });
});

router.get('/login', (req, res) => {
    res.set('Content-Type', 'text/html');
    var output = fs.readFile('login.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        } else{
            res.send(data);
        }
    });
});

router.post('/login', (req,res) => {
    
});

router.get('/post', (req,res) => { 

});

// WEB-AUTHN endpoint

router.post('/register/webauthn', (req,res) => {
    res.send('Credential registered successfully');
});

router.get('/abcd', (req, res) => {
    res.json({ "name" : "TrungNQ",
        "id" : "0",
     });
});

module.exports = router;
