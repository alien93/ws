
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
        extended: true
}));
router.use(bodyParser.json());
var session = require('express-session');
router.use(session({
        secret: 'ssshhhhh',
        resave: true,
        saveUninitialized: true
    }));
module.exports = router;

