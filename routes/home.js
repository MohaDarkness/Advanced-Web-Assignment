var express = require('express');
var path = require('path');
var router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/',(req, res, next)=>{
    res.render(path.join(__dirname,"../","views","home.ejs"), {logged:"You're not logged in"});
});

module.exports = router;