var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var User = require('./models').User


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.get('/home', (req, res) => {
  res.json({ message: 'api example app' })
})

app.get('/login', (req, res) => {
  res.json({ message: 'login test' })
})

app.post('/dates/new' (req, res) => {
  Dates.findAll().then()
})

app.get('/dates' (req, res) => {
  Dates.findAll().then(dates => {
    res.json({ dates: dates })
  })
})

app.post('/activity/new', (req, res) => {
  Activity.create({
    title: req.body.title,
    cost: req.body.cost,
    location: req.body.location,
    description: req.body.description
  }).then((activity)=>{
    res.status(201)
    res.json({activity: activity})
  })
})
