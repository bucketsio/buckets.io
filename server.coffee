express = require 'express'
compress = require 'compression'

module.exports = app = express()

app.engine 'html', require('ejs').renderFile

app.set 'views', "#{__dirname}/dist"

app.use compress()

app.use express.static "#{__dirname}/dist", maxAge: 86400000 * 7 # One week

app.listen process.env.PORT || 5000

app.get '/', (req, res) ->
  res.render 'index.html'

console.log 'Running'
