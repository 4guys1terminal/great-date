var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
const fs = require('fs');

var app = express();

var Tag = require('./models').Tag
var User = require('./models').User;
var Activity = require('./models').Activity;
var Tags = require('./models').Tag;
var ActivityTag = require('./models').ActivityTag;


app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(validator());
app.use(cors());

// authorization token
const authorization = (req, res, next) => {
    const token = req.query.authToken || req.body.authToken;
    if (token) {
        User.findOne({
            where: {
                authToken: token
            }
        }).then((user) => {
            if (user) {
                req.currentUser = user
                next()
            } else {
                res.status(401)
                res.json({message: 'Authorization Token Invalid'})
            }
        })
    } else {
        res.status(401)
        res.json({message: 'Authorization Token Required'})
    }
}

app.get('/', (req, res) => {
    res.json({message: 'API example app'});
});

// displays activities w/ raw json activities page
app.get('/activities', (req, res) => {
    Activity.findAll().then(activities => {
        res.json({activities: activities});
    });
});

// displays specific activity by ID
app.get('/activities/:id', (req, res) => {
    let id = parseInt(req.params.id);

    Activity.findById(id).then(activity => {
        res.json({activity: activity});
    });
});

app.get('/tags', (req, res) => {
    Tags.findAll().then((tags) => {
        res.json({tags: tags})
    })
})

app.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json({users: users})
    })
})

app.post('/users', (req, res) => {
    req.checkBody('firstName', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult().then(valErrors => {
        if (valErrors.isEmpty()) {
            User.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password}).then(user => {
                res.json({message: 'success', user: user})
            })
        } else {
            // console.log(validationErrors.array())
            res.status(400)
            res.json({
                errors: {
                    validations: valErrors.array()
                }
            })
        }
    })
})

// post route for creating activities
app.post('/activities', (req, res) => {

    //sets up validation checks on all submit fields
    req.checkBody('title', 'is required').notEmpty()
    req.checkBody('description', 'is required').notEmpty()
    req.checkBody('location', 'is required').notEmpty()
    req.checkBody('cost', 'is required').notEmpty()
    // req.checkBody('tag','is required').notEmpty()
    // req.checkBody('imageFile', 'is required').notEmpty()

    // if there are no errors logged, then it allows the activity to be created
    req.getValidationResult().then((validationErrors) => {
        if (validationErrors.isEmpty()) {

            Activity.create({
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                cost: req.body.cost
            }).then((activity) => {
                    res.status(201)
                    res.json({activity: activity})
                    // console.log(activity)
            })

            Activity.max('id').then(max => {
                tags = req.body.tags
                let tagsLength = Object.keys(req.body.tags).length
                let tagArr = []

                for (var property in tags) {

                    let val = {
                        ActivityId: max + 1,
                        TagId: property
                    }

                    tags[property] === true ? tagArr.push(val) : ''
                }

                ActivityTag.bulkCreate(tagArr).then(() => {
                    return ActivityTag.findAll();
                }).then(activityTags => {
                    // console.log(activityTags);
                })
                // console.log('final tagArr',tagArr);

            })

            let fileName = req.body.imageNames[0]
            console.log(fileName);
            //converting base64 string back into an image in the database
            let images = req.body.imageFiles.map((image) => {

                const base64ToImage = require('base64-to-image');

                var path = './public/user-uploads/'
                var optionalObj = {'fileName': fileName};

                var imageInfo = base64ToImage(image,path,optionalObj)
            })

            // TODO:
            // save specific file name with images
            // figure out how to integrate with FE
            // figure out how to add it to database area for pulling w/ the activity id


        } else {
            res.status(400)
            res.json({
                errors: {
                    validations: validationErrors.array()
                }
            })
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
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                let check = user.veryifyPassword(password)
                if (check) {
                    res.json({message: 'login success'})
                    // user.setAuthToken()
                } else {
                    res.json({message: 'Password Invalid'})
                }
            } else {
                res.status(401)
                res.json({message: 'Password Invalid'})
            }
        })
    } else {
        res.status(401)
        res.json({message: 'Email/Password Required'})
    }
})

// put route for editing activities
app.put('/activities/edit/:id', (req, res) => {
    const {name, content} = req.params;
    let id = parseInt(req.params.id);
    x

    Activity.findById(id).then(page => {
        Activity.update({
            title: title,
            description: description,
            location: location,
            cost: cost,
            tags: tags
        }, {
            where: {
                id: id
            }
        }).then(activity => {
            res.status(201);
            res.json({activity: activity});
        });
    });
});

// runs authorization check, responds with JSON to current user
app.get('/login', authorization, function(req, res) {
    res.json({user: request.currentUser})
})

module.exports = app
