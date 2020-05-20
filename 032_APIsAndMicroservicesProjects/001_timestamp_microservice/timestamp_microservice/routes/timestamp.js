
var express = require("express");
var router = express.Router();

router.get("/api/timestamp/:date_string?", function (req, res, next) {
  
  let d;
  
  if (typeof req.params.date_string === "undefined") {
    d = new Date();

    res.json({ unix: d.getTime(), utc: d.toUTCString() });

  } else {
    if (req.params.date_string.indexOf('-') === -1 && ! isNaN(parseInt(req.params.date_string))) {
        d = new Date(parseInt(req.params.date_string));    
    } else {
        d = new Date(req.params.date_string);
    }

    if (isNaN(d)) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: d.getTime(),
        utc: d.toUTCString(),
      });
    }
  }
});

module.exports = router;
