var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();
var User = require('./models').User
var Activity = require('./models').Activity

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.get('/home', (req, res) => {
    res.json({ message: 'api example app' })
})

// displays activities w/ raw json activities page
app.get('/activities', (req, res) => {
    Activity.findAll().then( (activities) =>{
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

// post route for creating activities
// may not need this /new subdomain
app.post('/activities/new', (req, res) => {
    req.checkBody('title','is required').notEmpty()
    req.checkBody('description','is required').notEmpty()
    req.checkBody('location','is required').notEmpty()
    req.checkBody('cost','is required').notEmpty()

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
