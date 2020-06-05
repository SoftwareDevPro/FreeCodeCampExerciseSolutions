
var express = require('express');
var router = express.Router();

const User = require("../schemas/Users");
const UserExercise = require("../schemas/UserExercises");

const mongoose = require("mongoose");
const shortid = require("shortid");

const mongo_options = { useNewUrlParser: true, useUnifiedTopology: true };

cfg = require("dotenv").config().parsed;
const MONGO_URL = `mongodb://${cfg.HOST}:${cfg.DBPORT}/${cfg.DB}`;

router.post('/api/exercise/new-user', function(req, res, next) {

    mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {
        
        if (err) {
            res.json({"error" : err});
            return;
        }

        const user = await User.findOne({ username: req.body.username });        

        if (user) {
            res.send("username already taken");
        } else {

            const userid = shortid.generate();

            let newUser = new User({ "username": req.body.username, "userId": userid });
            await newUser.save();

            res.json({ "username" : newUser.username, "_id" : userid });
        }
    });

});

router.post('/api/exercise/add', function(req, res, next) {

    mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {

        const user = await User.findOne({ userId: req.body.userId });
        
        if (user) {

            const description = req.body.description;
            const duration = parseInt(req.body.duration);
            const has_date = ! isNaN(new Date(req.body.date));
            const date = has_date ? new Date(req.body.date) : new Date();

            const userExercise = {
                "username": user.username,
                "description": description,
                "duration": duration,
                "user_id": user.userId,
                "date": date
            };
            
            const newUserExercise = new UserExercise(userExercise);

            await newUserExercise.save();

            res.json({ 
                "username": user.username,
                "description": description,
                "duration": duration,
                "_id": user.userId,
                "date": date
            });

        } else {
            res.send("unknown _id");
        }
    });
});

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

function subtractDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() - days)
    return copy
}

// GET /api/exercise/log?{userId}[&from][&to][&limit]

router.get('/api/exercise/log', function(req, res, next) {

    mongoose.connect(MONGO_URL, mongo_options, async (err, db) => {

        const user = await User.findOne({ userId: req.query.userId });
        
        if (user) {

            let has_from = typeof(req.query.from) !== 'undefined';
            let has_to = typeof(req.query.to) !== 'undefined';
            let has_limit = typeof(req.query.limit) !== 'undefined';
            let from_date, to_date, limit;

            if (has_from) {
                from_date = new Date(req.query.from);
                from_date = addDays(from_date, 1)
            }
            if (has_to) {
                to_date = new Date(req.query.to);
                to_date = addDays(to_date, 1)
            }
            if (has_limit) {
                limit = parseInt(req.query.limit);

                if (limit <= 0) {
                    has_limit = false
                    limit = undefined
                }
            }

            // if we have both dates, and the from date is farther
            // in the future then the to date, then swap them
            if (has_from && has_to && from_date > to_date) {
                let temp_date = to_date;
                to_date = from_date;
                from_date = temp_date;
            }


            let return_obj = {};

            return_obj['_id'] = user.userId;
            return_obj['username'] = user.username;
            return_obj['count'] = 0;
            return_obj['log'] = [];

            const userExercise = await UserExercise.find({ user_id: user.userId });

            let count = 0;

            if (userExercise) {

                for(let idx = 0; idx < userExercise.length; idx++) {

                    const cur = userExercise[idx];

                    let cur_include = true;
                    count += 1;

                    if (has_from) {
                        if (cur.date < subtractDays(from_date, 1)) {
                            cur_include = false;
                        }
                    }
                    if (has_to) {
                        if (cur.date > subtractDays(to_date, 1)) {
                            cur_include = false;
                        }
                    }
                    if (has_limit && count > limit) {
                        cur_include = false;
                    }

                    if (cur_include) {
                        let cur_log = {};
                        cur_log['description'] = cur.description;
                        cur_log['duration'] = cur.duration;
                        cur_log['date'] = cur.date;

                        return_obj['count'] += 1;
                        return_obj['log'].push(cur_log);
                    }
                }
            }

            res.json(return_obj)

        } else {
            res.send("unknown _id");
        }
    });

});

module.exports = router;


