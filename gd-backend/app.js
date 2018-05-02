const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const crypto = require('crypto')
const sequelize = require('sequelize');

// filesystem import & aws for image processing
const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk')

const app = express();

// Model Imports for Sequelize
const Tag = require('./models').Tag
const User = require('./models').User;
const Activity = require('./models').Activity;
const Tags = require('./models').Tag;
const ActivityTag = require('./models').ActivityTag;
const Location = require('./models').Location;

// Middleware (order matters! run from top to bottom)
app.use(express.static('public'))
app.use(express.static(path.resolve(__dirname, '../gd-frontend/build')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(validator());
app.use(cors());


// AWS S3 bucket setup for images
aws.config.region = 'us-west-1';
const s3 = new aws.S3();
const BUCKETNAME = process.env.S3_BUCKET;

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

// homepage
app.get('/api/home', (req, res) => {
    res.json({message: 'API example, app running'});
});

// displays respective route  w/ raw json from database onto page
app.get('/api/activities', (req, res) => {
    Activity.findAll().then(activities => {
        res.json({activities: activities});
    });
});

app.get('/api/tags', (req, res) => {
    Tags.findAll().then((tags) => {
        res.json({tags: tags})
    })
})

app.get('/api/users', (req, res) => {
    User.findAll().then(users => {
        res.json({users: users})
    })
})

app.get('/api/locations', (req, res) => {
    Location.findAll().then(locations => {
        res.json({locations: locations})
    })
})

// displays specific activity by ID
app.get('/api/activities/:id', (req, res) => {
    let id = parseInt(req.params.id);

    Activity.findById(id).then(activity => {
        res.json({activity: activity});
    });
});



app.post('/api/browse', (req, res) => {
    tags = req.body.tags
    let tagArr = []

    // TODO: needs comments
    for (var property in tags) {
        tags[property] === true
            ? tagArr.push(parseInt(property))
            : ''
    }


    if (tagArr.length === 0) {
        Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId";`, {type: sequelize.QueryTypes.SELECT})
        .then(allActivities => {
            let allIds = []

            for (var i = 0; i < allActivities.length; i++) {
                allIds.push(allActivities[i].ActivityId)
            }

            allIds = allIds.filter((elem, pos, arr) => {
                    return arr.indexOf(elem) == pos;
            });

        res.status(201)
        res.json({exclusiveIds: allIds,
                inclusiveIds: allIds})
        })
        .catch(e => console.log(e))
    } else {
        Tags.sequelize.query(`
            SELECT *
            FROM "ActivityTags"
            WHERE "TagId" in (${tagArr})
            GROUP BY "ActivityTags".id
            HAVING COUNT (distinct "TagId") = (${tagArr.length});`
            , {type: sequelize.QueryTypes.SELECT})
        .then(allExclusiveActivities => {

            // Browse Activities Exclusive

            let exclusiveIds = []

            for (var i = 0; i < allExclusiveActivities.length; i++) {
                exclusiveIds.push(allExclusiveActivities[i].ActivityId)
            }

            exclusiveIds = exclusiveIds.filter((elem, pos, arr) => {
                    return arr.indexOf(elem) == pos;
            });

            // Browse Activities Inclusive

            Tags.sequelize.query(`
                SELECT *
                FROM "Activities"
                JOIN "ActivityTags"
                ON "Activities".id="ActivityId"
                WHERE "TagId" IN (${tagArr});`
                , {type: sequelize.QueryTypes.SELECT})
            .then(allInclusiveActivities => {
                    let inclusiveIds = []

                    for (var i = 0; i < allInclusiveActivities.length; i++) {
                        inclusiveIds.push(allInclusiveActivities[i].ActivityId)
                    }

                    inclusiveIds = inclusiveIds.filter((elem, pos, arr) => {
                            return arr.indexOf(elem) == pos;
                    });

                console.log("exclusiveIds",exclusiveIds, "inclusiveIds",inclusiveIds);
                res.status(201)
                res.json({exclusiveIds: exclusiveIds,
                        inclusiveIds: inclusiveIds})
                })
                .catch(e => console.log(e))
            })
    }
});


// route for random date generator
app.post('/api/home', (req, res) => {
    tags = req.body.tags
    let tagArr = []
    for (var property in tags) {

        tags[property] === true
            ? tagArr.push(parseInt(property))
            : ''
    }

    if (tagArr.length === 0) {
        Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId";`, {type: sequelize.QueryTypes.SELECT})
        .then(shuffle => {
            let randomTag = shuffle[Math.floor(Math.random() * shuffle.length)].ActivityId
            res.status(201)
            res.json({randomTag: randomTag})
        })
        .catch(e => console.log(e))
    } else {
        Tags.sequelize.query(`SELECT * FROM "Activities" JOIN "ActivityTags" ON "Activities".id="ActivityId"  WHERE "TagId" IN (${tagArr});`, {type: sequelize.QueryTypes.SELECT})
        .then(shuffle => {
            let randomTag = shuffle[Math.floor(Math.random() * shuffle.length)].ActivityId
            res.status(201)
            res.json({randomTag: randomTag})
        })
        .catch(e => console.log(e))
    }

});



//Creating New User   (Need Kevin and dan to comment)

app.post('/api/users', (req, res) => {

    req.checkBody('firstName', 'Is required').notEmpty()
    req.checkBody('password', 'Is required').notEmpty()

    req.getValidationResult().then(valErrors => {
        if (valErrors.isEmpty()) {
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password})
                .then(user => {
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
app.post('/api/activities', (req, res) => {

    // console.log("req.body",req.body);
    //QUESTION: can i set up some processing to turn my tags object into a readable string or array? what about setting up a different form of validation on the tags?

    //sets up validation checks on all submit fields
    req.checkBody('title', 'is required').notEmpty()
    req.checkBody('description', 'is required').notEmpty()
    req.checkBody('location', 'is required').notEmpty()
    req.checkBody('cost', 'is required').notEmpty()
    req.checkBody('tags','are required').isLength({ min: 1 })
    req.checkBody('image_data', 'is required').notEmpty()

    // if there are no errors logged, then it allows the activity to be created
    req.getValidationResult().then((validationErrors) => {
        if (validationErrors.isEmpty()) {
          // destructures the request data from the front end form
          const { title, description, location, cost, image_extension } = req.body

          let { image_data } = req.body
          
          // sets up hashed file name
          let filePrefix = crypto.createHash('md5').update(image_data).digest('hex')

          // creates full file name for the image_database by appending the image extension to the new hashed name
          let fileName = `${filePrefix}.${image_extension}`

          // decodes base64 info from front end
          image_data = new Buffer(image_data.replace(/^data:image\/\w+;base64,/, ""),'base64')

          // s3 information for image upload to AWS cloud (uses hashed name (to ensure no data/name duplicate crossover))
          const s3params = {
            Bucket: 'great-date',
            Key: fileName,
            Body: image_data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${image_extension}`
          }

          // uploads to S3 bucket
          s3.upload(s3params, (err, image_data) => {
            console.log("data:", image_data);
            console.log("error:", err);
          })

          // sets up AWS s3 bucket URL to be saved with the specific activity so that we can display the src url on the front end
          const awsUrl = 'https://great-date.s3.us-west-1.amazonaws.com/'

          Activity.create({
              title: title,
              description: description,
              location: location,
              cost: cost,
              imageName: awsUrl + fileName,
          }).then((activity) => {
              res.status(201)
              res.json({activity: activity})
              // Takes the tag checkbox from our form
              tags = req.body.tags
              let tagArr = []

              // Pushes Id of newly made activity and any tag selected to an array to use for our ActivityTag Table

              // NOTE: this is where i'm going to have to make some adjustments to how tags are handled now that they're an array
              for (var property in tags) {
                  let val = {
                      ActivityId: activity.id,
                      TagId: property,
                  }
                  // Checks if a tag is checked or not
                  tags[property] === true
                      ? tagArr.push(val)
                      : ''
              }
              // Takes the array with new ActivityId and selected TagId and pushes them to our join table (ActivityTag)
              ActivityTag.bulkCreate(tagArr).then(() => {
                  return ActivityTag.findAll();
              })
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



// login form
app.post('/api/sessions/new', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // console.log(req.body)

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

//TODO: put route for editing activities
//
app.put('/api/activities/edit/:id', (req, res) => {

    const {name, content} = req.params;
    let id = parseInt(req.params.id);

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
app.get('/api/login', authorization, (req, res) => {
    res.json({user: req.currentUser})
})


app.get('/api/user-uploads/:name', (req,res) => {
  res.sendFile(path.resolve(__dirname, './public/user-uploads', req.params.name))
})



// ------- !!NOTE!!: UNCOMMENT FOR PRODUCTION -------

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../gd-frontend/build', 'index.html'))
// });


module.exports = app


//NOTE: this is random excess code, unused. consider for deletion

// let images = req.body.imageFile.map((image) => {
// const base64ToImage = require('base64-to-image');
//
// var path = '/api/public/user-uploads/'
// var bucket =
//
// var optionalObj = {
//     'fileName': hashedImageContent
// };
//
// console.log(base64ToImage(image, path, optionalObj));
// base64ToImage(image, path, optionalObj)
// })
