const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const { Video } = require('../models/Video');

const { auth } = require('../middleware/auth');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}_${file.originalname}`
        );
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(
            file.originalname
        );
        if (ext !== '.mp4') {
            return cb(
                res
                    .status(400)
                    .end('only mp4 is allowed'),
                false
            );
        }
        cb(null, true);
    },
});

const upload = multer({
    storage: storage,
}).single('file');

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, (err) => {
        if (err) {
            return res.json({
                success: false,
                err,
            });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성하고 비디오 러닝타임 가져오기
    let thumbsFilePath = '';
    let fileDuration = '';

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(
        req.body.url,
        function (err, metadata) {
            console.dir(metadata);
            console.log(metadata.format.duration);

            fileDuration =
                metadata.format.duration;
        }
    );

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(
                'Will generate ' +
                    filenames.join(', ')
            );
            thumbsFilePath =
                'uploads/thumbnails/' +
                filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({
                success: true,
                thumbsFilePath: thumbsFilePath,
                fileDuration: fileDuration,
            });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png',
        });
});

router.post('/uploadVideo', (req, res) => {
    // 비디오 정보를 서버에 저장한다.
    const video = new Video(req.body);
    console.log(req.body);
    video.save((err, doc) => {
        if (err)
            return res.json({
                success: false,
                err,
            });
        res.status(200).json({ success: true });
    });
});

module.exports = router;
