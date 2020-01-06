var express = require('express')
var router = express.Router()
var onFinished = require('on-finished')

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.send({ message: 'Handal Jepit' })
})

router.use('/*', (req, res, next) => {
  onFinished(res, function (err) {
    // console.log("request end");
  })

  next()
})

module.exports = router
