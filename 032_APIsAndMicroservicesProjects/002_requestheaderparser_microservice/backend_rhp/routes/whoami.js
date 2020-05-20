
var express = require('express');
var router = express.Router();

router.get('/api/whoami', function(req, res, next) {
    
      require('dns').lookup(require('os').hostname(), function (err, address, fam) {
        
        const software = req.headers['user-agent'].split(' ');

        is_lang_undef = typeof(req.headers['accept-language']) === 'undefined'; 
        
        const data = {
            // ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            ipaddress: address,
            language: (is_lang_undef ? '' : req.headers['accept-language'].split(',')[0]),
            software: software.join(' ')
        }
       
        res.json(data);  
    
      });
      
});

module.exports = router;

