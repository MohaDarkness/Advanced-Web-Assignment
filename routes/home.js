var express = require('express');
var path = require('path');
var router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/',(req, res, next)=>{
    // res.sendFile(path.join(__dirname,"../","views","home.html"));
    res.render(path.join(__dirname,"../","views","home.ejs"), {x:5});
});

module.exports = router;