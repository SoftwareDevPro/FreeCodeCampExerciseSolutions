
const express = require("express");
const router = express.Router();
const valid_url = require("valid-url");
const shortid = require("shortid");
const redisConnection = require('../redisClientConnection');

router.get("/api/shorturl/:shorturl", function (req, res, next) {

    // findCode looks through the passed object (result), which has the 
    // URL as the key/property name, and the short code as the value.
    function findCode(searching_for, result) {
        for(item in result) {
            if (result[item] == searching_for) {
                return item;
            }
        }
        return undefined;        
    }

    redisConnection.hgetall('shorturls', (err, result) => {
        if (err) {
            throw err;
        } else {
            let redirect_url = findCode(req.params.shorturl, result);

            if (typeof(redirect_url) !== 'undefined') {
                return res.redirect(redirect_url); 
            } else {
                res.json({"error" : "invalid URL"});
            }
        }
    });
});

  
router.post("/api/shorturl/new", async function (req, res, next) {
  
    const original_url = req.body.original_url;
  
    if (! valid_url.isUri(original_url)) {
      res.json({"error" : "invalid URL"});
      return;
    }
  
    const short_url = shortid.generate();

    redisConnection.hget('shorturls', original_url, (err, value) => {
        
        // if we found it...
        if (value) {
            
            // ... then send back the response.

            res.json({ 
                "original_url": original_url, 
                "short_url": value 
            });

        } else { 

            // Create the JSON object to send back ... 
            const short = { "original_url": original_url, "short_url": value };

            // Save it off in Redis
            redisConnection.hset('shorturls', original_url, short_url);
            
            // ... and send back the response
            res.json({'original_url': original_url, 'short_url' : short_url});  
        }
    });
});

module.exports = router;


