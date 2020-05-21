
const fastify = require('fastify');
const mongoose = require("mongoose");
const valid_url = require("valid-url");
const shortid = require("shortid");

const UrlShorten = require("./schemas/UrlShorten");

const mongo_options = { useNewUrlParser: true, useUnifiedTopology: true };

cfg = require("dotenv").config().parsed;
const MONGO_URL = `mongodb://${cfg.HOST}:${cfg.DBPORT}/${cfg.DB}`;

function build_fastify () {
    
    const f = fastify({ logger: true });

    f.register(require('fastify-cors'), { /* */ });

    f.post("/api/shorturl/new", async function (request, reply) {

        const original_url = request.body.original_url;

        if (! valid_url.isUri(original_url)) {
          reply.send({"error" : "invalid URL"});
          return;
        }
      
        const short_url = shortid.generate();
      
        mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {
      
          const url = await UrlShorten.findOne({ original_url: original_url });
          
          if (url) {
      
            reply.send({ 
              "original_url": url.original_url, 
              "short_url": url.short_url 
            });
      
          } else {
      
            const newShort = { "original_url": original_url, "short_url": short_url };
      
            let us = new UrlShorten(newShort);
            await us.save();
        
            reply.send(newShort);
          }
        });      
    });
    
    f.get("/api/shorturl/:shorturl", async function (request, reply) {
              
        mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {
          if (err) {
              reply.send({"error" : err});
              return;
          }
          
          const url_code = request.params.shorturl;
          const doc = await UrlShorten.findOne({ short_url: url_code });
      
          if (doc) {
              return reply.redirect(doc.original_url);
          } else {
              reply.send({"error" : "invalid URL"});
          }
        });
    });

  
  return f
}

module.exports = build_fastify
