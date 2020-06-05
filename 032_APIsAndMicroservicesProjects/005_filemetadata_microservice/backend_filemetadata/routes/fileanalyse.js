
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {

    let json_output = {
        'name': req.file.originalname, 
        "type": req.file.mimetype, 
        "size" : req.file.size 
    };

    res.json(json_output)
});

module.exports = router;


