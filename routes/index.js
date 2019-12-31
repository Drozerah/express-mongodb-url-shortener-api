const express = require('express')
const router = express.Router()

const Url = require('../models/Url')

// @route           GET /:code
// @description     Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code }) // find url into db
    if (url) {
      return res.redirect(url.longUrl)
    } else {
      console.error('GET: 404 url not found')
      return res.status(404).json({ "404": "No url found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json('Server error') 
  }
})

module.exports = router