var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var app = express();

var User = require('./models').User;
var Activity = require('./models').Activity;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(validator());
app.use(cors());

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

// post route for creating activities
// post route for creating activities
app.post('/activities', (req, res) => {

    //sets up validation checks on all submit fields
    req.checkBody('title', 'is required').notEmpty()
    req.checkBody('description', 'is required').notEmpty()
    req.checkBody('location', 'is required').notEmpty()
    req.checkBody('cost', 'is required').notEmpty()
    // req.checkBody('tag','is required').notEmpty()

    // if there are no errors logged, then it allows the activity to be created
    req.getValidationResult().then((validationErrors) => {
        if (validationErrors.isEmpty()) {

            Activity.create({title: req.body.title, description: req.body.description, location: req.body.location, cost: req.body.cost}).then((activity) => {
                res.status(201)
                res.json({activity: activity})
                // console.log(activity)
            })

            Activity.max('id').then(max => {
                tags = Object.keys(req.body.tags)
                console.log(tags);
                var tagArr = []
                for (i = 0; i < tags.length; i++) {

                    tagArr.push({
                        ActivityId: max + 1,
                        TagId: tags[i]
                    })
                }

                ActivityTag.bulkCreate(tagArr).then(() => {
                    return ActivityTag.findAll();
                }).then(activityTags => {
                    // console.log(activityTags);
                })
                console.log(tagArr);

            })


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

module.exports = app;
