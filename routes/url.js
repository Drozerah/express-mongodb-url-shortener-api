const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/Url') // url db model


// @route           POST /api/url/shorten
// @description     Create short URL from long url
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body // get url from request body
  const baseURL = config.get('baseURL') // get baseURL

  // Check base url
  if (!validUrl.isUri(baseURL)) {
    return res.status(401).json('POST: Invalid base url')
  }

  // Create url code
  const urlCode = shortid.generate() // generate url code

  // Check long url validity from request json
  if (validUrl.isUri(longUrl)) {

    try {

      // check if url already exists in db
      let url = await Url.findOne({ longUrl })

      if (url) {
        // return existing url
        res.json(url)

      } else {
        // create url if not already exists
        const shortUrl = baseURL + '/' + urlCode
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        })
        await url.save() // save/store url to db in urls collection
        res.json(url) // browser responds with the url
      }

    } catch (error) { // the try failed

      console.error(error)
      res.status(500).json('Server error') // browser responds with an error message
    }
  } else {
    console.error('POST: 401 error invalid long URL')
    res.status(401).json({ "401": "invalid long URL" })
  }

})

module.exports = router