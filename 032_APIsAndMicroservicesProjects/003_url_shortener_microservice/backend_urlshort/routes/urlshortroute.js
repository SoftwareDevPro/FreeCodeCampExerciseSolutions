
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const valid_url = require("valid-url");
const shortid = require("shortid");

const UrlShorten = require("../schemas/UrlShorten");

const mongo_options = { useNewUrlParser: true, useUnifiedTopology: true };

cfg = require("dotenv").config().parsed;
const MONGO_URL = `mongodb://${cfg.HOST}:${cfg.DBPORT}/${cfg.DB}`;

router.get("/api/shorturl/:shorturl", function (req, res, next) {
  
  //console.log(req.params.shorturl);

  mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {
    if (err) {
        res.json({"error" : err});
        return;
    }
    
    const url_code = req.params.shorturl;
    const doc = await UrlShorten.findOne({ short_url: url_code });

    if (doc) {
        return res.redirect(doc.original_url);
    } else {
        res.json({"error" : "invalid URL"});
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

  mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {

    const url = await UrlShorten.findOne({ original_url: original_url });
    
    if (url) {

      res.json({ 
        "original_url": url.original_url, 
        "short_url": url.short_url 
      });

    } else {

      const newShort = { "original_url": original_url, "short_url": short_url };

      let us = new UrlShorten(newShort);
      await us.save();
  
      res.json(newShort);
    }
  
  });

});

module.exports = router;
