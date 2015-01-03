var express = require('express')
    ,router = express.Router()
    ,marked = require('marked')
 

/* transfer markdown to html */
router.get('/', transfer)

function transfer(req, res) {
       
}

module.exports = router
