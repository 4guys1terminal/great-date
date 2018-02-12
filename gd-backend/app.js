var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();

var Tag = require('./models').Tag
var User = require('./models').User;
var Activity = require('./models').Activity;
var ActivityTag = require('./models').ActivityTag;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

// authorization token
const authorization = (req, res, next) => {
    const token = req.query.authToken || req.body.authToken;
    if (token) {
        User.findOne({
            where: { authToken: token }
        }).then((user) => {
            if (user) {
                req.currentUser = user
                next()
            } else {
                res.status(401)
                res.json({ message: 'Authorization Token Invalid' })
            }
        })
    } else {
        res.status(401)
        res.json({ message: 'Authorization Token Required' })
    }
}

// uncertain if we need this 'home' route, may just be a '/'
app.get('/', (req, res) => {
    res.json({ message: 'API example app' })
})

// displays activities w/ raw json activities page
app.get('/activities', (req, res) => {
    Activity.findAll().then( (activities) => {
        res.json({activities: activities})
    })
})

// displays specific activity by ID
app.get('/activities/:id', (req, res) => {
    let id = parseInt(req.params.id);

    Activity.findById(id).then((activity) => {
        res.json({
            activity: activity
        })
    })
})

app.get('/users',(req, res) => {
    User.findAll().then(users => {
        res.json({ users: users })
    })
})

app.post('/users', (req, res) => {
    User.create(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            location: req.body.location,
            password: req.body.password
            
        }).then((user) => {
            res.json({
                message: 'success',
                user: user
            })
        }).catch((error) => {
            res.status(400)
            res.json({
                message: "Unable to create User",
                errors: error
            })
        })
})

// post route for creating activities
app.post('/activities', (req, res) => {

//sets up validation checks on all submit fields
    req.checkBody('title','is required').notEmpty()
    req.checkBody('description','is required').notEmpty()
    req.checkBody('location','is required').notEmpty()
    req.checkBody('cost','is required').notEmpty()

// if there are no errors logged, then it allows the activity to be created
    req.getValidationResult()
        .then((validationErrors) => {
            if(validationErrors.isEmpty()){
                Activity.create({
                    title: req.body.title,
                    description: req.body.description,
                    location: req.body.location,
                    cost: req.body.cost
                }).then((activity)=>{
                    res.status(201)
                    res.json({activity: activity})
                })
            } else{
                res.status(400)
                res.json({errors: {validations: validationErrors.array()}})
            }
        })
})

// login form
app.post('/sessions/new', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)

    if (email && password) {
        User.findOne({
            where: { email: email }
        }).then(user => {
            if (user) {
                let check = user.veryifyPassword(password)
                if (check) {
                    res.json({ message: 'login success' })
                    // user.setAuthToken()
                } else {
                    res.json({ message: 'Password Invalid' })
                }
            } else {
                res.status(401)
                res.json({ message: 'Password Invalid' })
            }
        })
    } else {
        res.status(401)
        res.json({
            message: 'Email/Password Required'
        })
    }
})

// put route for editing activities
app.put('/activities/edit/:id', (req, res) => {
    console.log(req.params.name);
    console.log(req.body);
    const { name, content } = req.params;
    let id = parseInt(req.params.id);

    Activity.findById(id).then((page) => {
        Activity.update({
            title: title,
            description: description,
            location: location,
            cost: cost
        },
        {
            where: {
                id: id
            }
        }).then((activity) => {
            res.status(201)
            res.json({activity: activity})
        })
    })
})

// runs authorization check, responds with JSON to current user
app.get('/login',
    authorization,
    function (req, res) {
        res.json({ user: request.currentUser })
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

module.exports = app