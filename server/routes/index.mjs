import express from "express";
import fs from "fs";
import path from "path";


const router = express.Router();
//EASTER EGG

const Feelthesauce = (req, res, next) => {
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


// MAIN WEB INDEX - TODO: Route for success login

router.get('/home', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
    res.render('register');
});

// ERROR PAGE

router.get('/error-page', async(req, res) =>{
    res.status(404).render('somethingwentwrong');
});

export default router;

