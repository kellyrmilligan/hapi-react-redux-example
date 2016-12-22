import Glue from 'glue'
import Hoek from 'hoek'
import Confidence from 'confidence'
import dotenv from 'dotenv'

dotenv.config()
const store = new Confidence.Store(require('../glue-config'))
const manifest = store.get('/', {
  env: process.env.NODE_ENV
})
const options = { relativeTo: __dirname }

module.exports = function (done) {
  Glue.compose(manifest, options, (err, server) => {
    Hoek.assert(!err, err)
    done(null, server)
  })
}
