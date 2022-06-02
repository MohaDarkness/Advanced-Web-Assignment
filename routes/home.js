var express = require('express');
var path = require('path');
var router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/',(req, res, next)=>{
    res.render("home", {logged:"You're not logged in", tab_title:"Home"});
});




module.exports = router;