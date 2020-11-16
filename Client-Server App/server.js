const { createRequireFromPath } = require("module");

const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

morgan.token('host', function (req, res) { return req.headers.host })
morgan.token('data', function (req, res) {
    const { counter } = req.body
    const random = req.headers['x-random']
    let tempData = { counter, "X-RANDOM": random }
    return JSON.stringify(tempData)
})

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a'})
app.use(morgan('[:date[iso]] Success\: :method :host :data', { stream: accessLogStream }))

app.post('/', (req, res) => {
    console.log(res)
    res.status(201).send('Success')
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is starting and running at port ${PORT}`)
});

module.exports = app;