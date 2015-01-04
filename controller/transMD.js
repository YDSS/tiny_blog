var express = require('express')
    ,router = express.Router()
    ,marked = require('marked')
 
/* set marked options*/
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

/* transfer markdown to html */
router.post('/', transfer)

function transfer(req, res) {
	var raw = contactContent(req)
      html = marked(raw)

  res.send(html)
}

function contactContent(req) {
  var body = req.body,
      title = body.title,
      content = body.content

  return '##' + title + '\n' + content 
}

module.exports = router
