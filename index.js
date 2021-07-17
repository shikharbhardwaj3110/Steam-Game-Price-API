const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const cors = require('cors')
const priceModule = require('./price')

const app = express()

const port = process.env.PORT || 3000;

app.use(cors())

app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    priceModule.getDetails(req.query.appId).then(resp => {
        if (resp.hasOwnProperty('error')) {
            res.send(400)
        }
        res.json(resp);
    })
})

app.listen(port, () => {
    console.log("App running on port : ", port)
})
